import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from "react-router-dom";
import { fetchRegisterToolkit } from "../../redux/slides/userSlice";
import * as yup from "yup";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Schema validation với yup
  const schema = yup.object({
    email: yup
      .string()
      .email("Email không đúng định dạng")
      .required("Yêu cầu nhập email"),
    name: yup.string().required("Yêu cầu nhập Họ tên"),
    password: yup
      .string()
      .min(6, "Mật khẩu cần ít nhất 6 ký tự")
      .required("Mật khẩu"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("Mật khẩu"), null], "Mật khẩu không khớp")
      .required("Xác nhận Mật khẩu"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password, name }) => {
    try {
      const result = await dispatch(
        fetchRegisterToolkit({ email, password, name })
      );

      if (result.payload.error === 1) {
        setError("email", {
          type: "server",
          message: result.payload.message,
        });
      } else {
        Swal.fire({
          title: "Thông báo!",
          text: "Đăng ký thành công",
          icon: "success",
          confirmButtonText: "Đóng",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
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
    <div className="flex items-center justify-center lg:mt-0 mt-[100px]">
      <form
        className="bg-white shadow-lg rounded px-8 pt-6 pb-8 w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Họ Tên
          </label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nhập tên"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Địa chỉ email
          </label>
          <input
            type="email"
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

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Xác nhận mật khẩu"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Đăng ký
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Bạn đã có tài khoản rồi?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
