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
type SignInSchema = z.infer<typeof SignUpSchema>;

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(SignUpSchema),
  });
  const onSubmit = async (data: SignInSchema) => {
    console.log(data)
    const response = await signingUser(data);
    console.log(response);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div>
        <Input placeholder="username" {...register("username")} type="text" />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
      </div>
      <div>
        <Input placeholder="Email" {...register("email")} type="text" />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Password"
          {...register("password")}
          type={showPassword ? "text" : "password"}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye /> : <EyeClosed />}
        </Button>
      </div>

      <Button type="submit">SignIn</Button>
    </form>
  );
};

export default SignIn;
