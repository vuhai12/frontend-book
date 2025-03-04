import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { fetchLoginToolkit } from "../../redux/slides/userSlice";
import { AlertCircle } from "lucide-react";
import { useSocket } from "../../context/SocketContext";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading);
  const socket = useSocket();

  const schema = yup.object({
    email: yup
      .string()
      .email("Không đúng định dạng email")
      .required("Yêu cầu nhập email"),
    password: yup
      .string()
      .min(6, "password cần ít nhất 6 ký tự")
      .required("Yêu cầu nhập mật khẩu"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const response = await dispatch(fetchLoginToolkit({ email, password }));
      if (response.payload.error === 1) {
        if (/email/i.test(response.payload.message)) {
          setError("email", {
            type: "server",
            message: response.payload.message,
          });
        }
        if (/password/i.test(response.payload.message)) {
          setError("password", {
            type: "server",
            message: response.payload.message,
          });
        }
        // setError("password", {
        //   type: "server",
        //   message: response.payload.message,
        // });
      } else {
        const token = localStorage.getItem("access_token");
        socket.auth = { token };
        socket.connect();
        Swal.fire({
          title: "Thông báo!",
          text: "Đăng nhập thành công",
          icon: "success",
          confirmButtonText: "Đóng",
        }).then((result) => {
          if (result.isConfirmed) {
            if (response.payload.role_code === "R1") {
              navigate("/system-admin-user");
            } else if (response.payload.role_code === "R2") {
              navigate("/user-info");
            }
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Thông báo!",
        text: "An unexpected error occurred",
        icon: "error",
        confirmButtonText: "Đóng",
      });
    }
  };

  return (
    <div className="flex items-center justify-center mt-[100px] lg:mt-0">
      <form
        className="bg-white shadow-lg rounded px-8 pt-6 pb-8 w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Địa chỉ Email
          </label>
          <input
            type="email"
            autoComplete="new-password"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[red-200] ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nhập email"
            {...register("email")}
          />
          {/* {option.error && (
                      <p className="text-red-600 text-sm mt-1 font-medium flex items-center gap-1">
                        <AlertCircle className="w-4 h-4 text-red-600" />{" "}
                        {errors.email.message}
                      </p>
                    )} */}
          {errors.email && (
            <p className="text-red-600 text-sm mt-1 font-medium flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-red-600" />{" "}
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mật khẩu
          </label>
          <input
            type="password"
            autoComplete="new-password"
            name="password"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[red-200] ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nhập mật khẩu"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1 font-medium flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-red-600" />{" "}
              {errors.password.message}
            </p>
          )}

          {/* {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )} */}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className={`w-full ${
            isLoading
              ? "bg-gray-600 text-white"
              : "bg-[#003366] text-white hover:bg-[#193b5c] focus:outline-none focus:ring-[red-200]"
          }   font-bold py-2 px-4 rounded `}
        >
          {isLoading ? "Đang Đăng Nhập..." : "Đăng nhập"}
        </button>
        <p
          className="text-sm text-gray-600 underline mt-3 text-center cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          Quên mật khẩu
        </p>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Bạn chưa có tài khoản?{" "}
            <Link to="/register" className="text-[#003366] underline">
              Đăng ký
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
