import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("유효한 이메일을 입력해주세요"),
  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
  rememberMe: z.boolean().optional(),
});

export const signupSchema = z
  .object({
    email: z.string().email("유효한 이메일을 입력해주세요"),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
      .max(20, "비밀번호가 너무 깁니다"),
    confirmPassword: z.string(),
    phone: z
      .string()
      .min(10, "유효한 전화번호를 입력해주세요")
      .max(11, "유효한 전화번호를 입력해주세요")
      .regex(/^[0-9]+$/, "숫자만 입력해주세요"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });
