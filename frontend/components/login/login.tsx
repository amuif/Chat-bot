"use client";

import { useState } from "react";
import type { z } from "zod";
import { LoginSchema } from "@/lib/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { logingUser } from "@/server-side-actions/get-user";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  EyeIcon as EyeClosed,
  Eye,
  Lock,
  Mail,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUserStore } from "@/stores/useUserStore";
type LoginInSchema = z.infer<typeof LoginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setUser = useUserStore((state) => state.setUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginInSchema) => {
    setIsLoading(true);
    try {
      const response = await logingUser(data);
      const { username, email } = response;
      console.log(response);
      console.log(username);
      toast.success(`Welcome back, ${username}`);
      setUser({ name: username, email });
      router.push("/");
    } catch (err: any) {
      if (err.response && err.response.data.message) {
        const message = err?.response?.data?.message || "Something went wrong";
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#2a2a2a] backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 rounded-full bg-[#303030] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-gray-300" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Welcome back
            </h1>
            <p className="text-gray-400">Sign in to your account to continue</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Enter your email"
                  type="email"
                  {...register("email")}
                  className="h-14 pl-12 bg-[#303030] border-gray-600/50 text-white placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500/20 transition-all duration-200"
                />
              </div>
              {errors.email && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1 block"
                >
                  {errors.email.message}
                </motion.span>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Enter your password"
                  className="h-14 pl-12 pr-12 bg-[#303030] border-gray-600/50 text-white placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500/20 transition-all duration-200"
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeClosed className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1 block"
                >
                  {errors.password.message}
                </motion.span>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-white hover:bg-gray-200 text-black font-semibold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Button
                variant="link"
                onClick={() => router.push("/signup")}
                className="!px-0 text-white hover:text-gray-300 transition-colors underline"
              >
                Sign up
              </Button>
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center text-xs text-gray-500 mt-4"
        >
          Secure login with end-to-end encryption
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
