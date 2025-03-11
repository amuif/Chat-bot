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

  const onSubmit = async (data: LoginInSchema) => {
    const response = await  logingUser(data);
    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 ">
      <div>
        {" "}
        <Input placeholder="Email" type="email" {...register("email")} />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div>
        <div className="flex gap-2">
          <Input
            className=""
            placeholder="password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye /> : <EyeClosed />}
          </Button>
        </div>{" "}
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>

      <Button type="submit">Login</Button>
    </form>
  );
};

export default Login;
