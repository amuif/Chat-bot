"use client";
import { useState } from "react";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/lib/schemas/schemas";
import { useForm } from "react-hook-form";
import { signingUser } from "@/server-side-actions/get-user";
import { Input } from "../ui/input";
import {
  Eye,
  User,
  Mail,
  Lock,
  UserPlus,
  ArrowRight,
  EyeClosed,
} from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { motion } from "framer-motion";
import React from "react";
type SignInSchema = z.infer<typeof SignUpSchema>;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser } = useUserStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignInSchema) => {
    setIsLoading(true);
    try {
      const response = await signingUser(data);
      const { username, email } = response;
      toast.success(`Welcome to Axon, ${username}`);
      setUser({ name: username, email });
      router.push("/");
    } catch (err) {
      if (err instanceof Error && (err as any)?.response?.data?.message) {
        const message =
          (err as any)?.response?.data?.message || "Something went wrong";
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#2a2a2a] backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 rounded-full bg-[#303030] flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-gray-300" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-400">Join Axon and start your journey</p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Choose a username"
                  {...register("username")}
                  type="text"
                  className="h-14 pl-12 bg-[#303030] border-gray-600/50 text-white placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500/20 transition-all duration-200"
                />
              </div>
              {errors.username && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1 block"
                >
                  {errors.username.message}
                </motion.span>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Enter your email"
                  {...register("email")}
                  type="email"
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

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Create a strong password"
                  className="h-14 pl-12 pr-12 bg-[#303030] border-gray-600/50 text-white placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500/20 transition-all duration-200"
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-white hover:bg-gray-200 text-black font-semibold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Button
                onClick={() => router.push("/login")}
                variant="link"
                className="text-white hover:text-gray-300 !px-0 transition-colors underline"
              >
                Sign in
              </Button>
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center text-xs text-gray-500 mt-4"
        >
          Join thousands of users already using Axon
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
