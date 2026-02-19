import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * ZOD v4 SAFE SCHEMA
 * Dùng nonempty thay vì min(1)
 */
const loginSchema = z.object({
  email: z.string().nonempty("Please enter email").email("Email is invalid"),
  password: z
    .string()
    .nonempty("Please enter password")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit", // QUAN TRỌNG
  });

  const onSubmit = async (data) => {
    try {
      console.log("Login data:", data);

      // Demo delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Login success (demo)");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
          Login
        </h2>

        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
          noValidate
        >
          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email</label>
            <input
              {...register("email")}
              placeholder="Enter your email"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED553B]"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Password</label>

            <div className="relative">
              <input
                {...register("password")}
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED553B]"
              />

              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#ED553B]"
              >
                {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* FORGOT PASSWORD */}
          <p className="text-right text-xs sm:text-sm">
            Forgot your{" "}
            <span className="text-[#ED553B] font-semibold cursor-pointer">
              Password?
            </span>
          </p>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="py-3 bg-[#ED553B] text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          {/* OR */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-gray-300"></div>
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          {/* GOOGLE */}
          <button
            type="button"
            className="py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Login with Google
          </button>

          {/* REGISTER */}
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#ED553B] font-semibold hover:underline"
            >
              Register Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
