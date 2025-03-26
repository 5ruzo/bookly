import { authService } from '@/lib/api/authService';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '올바른 이메일 형식이 아닙니다.' }),
  password: z
    .string()
    .min(1, { message: '비밀번호를 입력해주세요.' })
    .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
  rememberMe: z.boolean().optional(),
});

export const signupSchema = z
  .object({
    email: z
      .string()
      .email('유효하지 않은 이메일 형식입니다.')
      .refine(
        async (email) => {
          const exists = await authService.checkEmailExists(email);
          return !exists;
        },
        { message: '이미 사용 중인 이메일입니다.' }
      ),
    password: z
      .string()
      .min(1, { message: '비밀번호를 입력해주세요.' })
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
      .regex(/[0-9]/, {
        message: '비밀번호는 최소 하나의 숫자를 포함해야 합니다.',
      })
      .regex(/[^A-Za-z0-9]/, {
        message: '비밀번호는 최소 하나의 특수문자를 포함해야 합니다.',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: '비밀번호 확인을 입력해주세요.' }),

    phone: z
      .string()
      .min(1, { message: '휴대폰 번호를 입력해주세요.' })
      .regex(/^010-\d{4}-\d{4}$/, {
        message: '올바른 형식의 휴대폰 번호를 입력해주세요.',
      })
      .refine(
        async (phone) => {
          // Async phone verification
          const verified = await authService.verifyPhone(phone);
          return verified;
        },
        { message: '휴대폰 인증에 실패했습니다.' }
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '올바른 이메일 형식이 아닙니다.' }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: '비밀번호를 입력해주세요.' })
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
      .regex(/[0-9]/, {
        message: '비밀번호는 최소 하나의 숫자를 포함해야 합니다.',
      })
      .regex(/[^A-Za-z0-9]/, {
        message: '비밀번호는 최소 하나의 특수문자를 포함해야 합니다.',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: '비밀번호 확인을 입력해주세요.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });
