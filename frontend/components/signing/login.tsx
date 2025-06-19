"use client";
import React, { useState } from "react";
import { z } from "zod";
import { LoginSchema } from "@/lib/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { logingUser } from "@/server-side-actions/get-user";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EyeClosed, Eye } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
type LoginInSchema = z.infer<typeof LoginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInSchema>({
    resolver: zodResolver(LoginSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: LoginInSchema) => {
    try {
      const response = await logingUser(data);
      const { username } = response;
      toast.success(`welcome back, ${username}`);
      router.push("/");
    } catch (err: any) {
      if (err.response && err.response.data.message) {
        const message = err?.response?.data?.message || "Something went wrong";
        toast.error(message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 ">
      <p className="text-xl lg:text-3xl text-left font-bold">Welcome back</p>
      <div>
        {" "}
        <Input
          placeholder="Email"
          type="email"
          {...register("email")}
          className="h-14 dark:bg-[#212121]"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div>
        <div className="relative w-full">
          <Input
            placeholder="Password"
            className="h-14 pr-12 dark:bg-[#212121]"
            {...register("password")}
            type={showPassword ? "text" : "password"}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 dark:bg-[#212121] z-10"
            onMouseDown={(e) => e.preventDefault()} // Prevent input blur
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye /> : <EyeClosed />}
          </Button>
        </div>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>

      <Button type="submit">Login</Button>
    </form>
  );
};

export default Login;
