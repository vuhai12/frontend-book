import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { requestPasswordReset } from "../../redux/slides/userSlice";
import { AlertCircle } from "lucide-react";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading);

  const schema = yup.object({
    email: yup
      .string()
      .email("Không đúng định dạng email")
      .required("Yêu cầu nhập email"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email }) => {
    try {
      dispatch(requestPasswordReset({ email })).then(() => {
        Swal.fire({
          title: "Thông báo!",
          text: "Vui lòng check mail",
          icon: "success",
          confirmButtonText: "Đóng",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      });
      console.log("email", email);
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
        <h2 className="text-2xl font-bold text-center mb-6">
          Tìm tài khoản của bạn
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Vui lòng nhập Email của bạn
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

          {errors.email && (
            <p className="text-red-600 text-sm mt-1 font-medium flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-red-600" />{" "}
              {errors.email.message}
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

export default ForgotPassword;
