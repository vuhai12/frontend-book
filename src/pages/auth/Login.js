import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { fetchLoginToolkit } from "../../redux/slides/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nhập email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
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
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nhập mật khẩu"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Đăng nhập
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Bạn chưa có tài khoản?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Đăng ký
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
