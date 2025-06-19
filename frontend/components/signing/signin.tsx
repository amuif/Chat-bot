"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/lib/schemas/schemas";
import { useForm } from "react-hook-form";
import { signingUser } from "@/server-side-actions/get-user";
import { Input } from "../ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
type SignInSchema = z.infer<typeof SignUpSchema>;

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignInSchema) => {
    try {
      const response = await signingUser(data);
      const { username } = response;
      toast.success(`welcome to axon, ${username}`);
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
      <div className="flex flex-col gap-1">
        <Input
          placeholder="username"
          {...register("username")}
          type="text"
          className="h-14 dark:bg-[#212121]"
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Input
          placeholder="Email"
          {...register("email")}
          type="text"
          className="h-14 dark:bg-[#212121]"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
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

      <Button type="submit">SignIn</Button>
    </form>
  );
};

export default SignIn;
