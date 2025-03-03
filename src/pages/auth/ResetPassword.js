import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { fetchLoginToolkit, resetPassword } from "../../redux/slides/userSlice";
import { AlertCircle } from "lucide-react";
import { useSocket } from "../../context/SocketContext";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // ✅ Lấy token từ URL

  const schema = yup.object({
    newPassword: yup
      .string()
      .min(6, "password cần ít nhất 6 ký tự")
      .required("Yêu cầu nhập mật khẩu"),
  });
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ newPassword }) => {
    console.log("token", token);
    console.log("newPassword", newPassword);
    try {
      dispatch(resetPassword({ token, newPassword })).then((res) => {
        console.log("res", res);
        if (res.payload.error == 0) {
          Swal.fire({
            title: "Thông báo!",
            text: "Bạn đã đổi mật khẩu thành công",
            icon: "success",
            confirmButtonText: "Đóng",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        }
        if (res.payload.error == 1) {
          Swal.fire({
            title: "Thông báo!",
            text: res.payload.message,
            icon: "error",
            confirmButtonText: "Đóng",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        }
      });
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-[100px] lg:mt-0">
      <form
        className="bg-white shadow-lg rounded px-8 pt-6 pb-8 w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nhập lại Mật khẩu của bạn
          </label>
          <input
            type="password"
            autoComplete="new-password"
            name="newPassword"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[red-200] ${
              errors.newPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nhập mật khẩu"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <p className="text-red-600 text-sm mt-1 font-medium flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-red-600" />{" "}
              {errors.newPassword.message}
            </p>
          )}
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
      </form>
    </div>
  );
};

export default ResetPassword;
