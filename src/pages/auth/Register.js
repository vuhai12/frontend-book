import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/* Schema */
const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter name")
    .min(3, "Name must be at least 3 characters"),
  email: z.string().min(1, "Please enter email").email("Email is invalid"),
  password: z
    .string()
    .min(1, "Please enter password")
    .min(6, "Password must be at least 6 characters"),
});

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    // handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  // const onSubmit = async (data) => {
  //   console.log("Register data:", data);
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  //   alert("Register success (demo)");
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
          Register
        </h2>

        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
          noValidate
        >
          {/* NAME */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Name</label>
            <input
              {...register("name")}
              placeholder="Enter your name"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED553B]"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

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

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="py-3 bg-[#ED553B] text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          {/* LOGIN LINK */}
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#ED553B] font-semibold hover:underline"
            >
              Login Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
