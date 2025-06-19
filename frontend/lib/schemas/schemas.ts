import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "password must be greater than 6 digits"),
});

export const SignUpSchema = z.object({
  username: z.string().min(3, "username must be atleast 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "password must be greater than 6 digits"),
});
