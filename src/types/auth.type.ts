import { User } from '@supabase/supabase-js';
import { ReactNode } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

// 사용자 데이터에 대한 타입을 정의
export type UserData = {
  id: string;
  email: string;
  phone?: string;
};

// Zustand를 사용해 인증 상태를 관리할 때 사용할 스토어의 타입
export type UserState = {
  user: User | null;
  isLogin: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  error: string | null;
  setError: (message: string) => void;
};

// 인증 버튼에 필요한 props 타입을 정의
export type AuthButtonProps = {
  children: ReactNode;
  type?: 'submit' | 'button';
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'kakao';
  className?: string;
};

// 인증 카드에 필요한 props 타입을 정의
export type AuthCardProps = {
  children: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
};

// 인증 오류 메시지를 표시할 컴포넌트에 필요한 props 타입
export type AuthErrorMessageProps = {
  message: string; // 표시할 오류 메시지 텍스트
};

// 인증 입력 필드를 위한 props 타입이에요.
export type AuthInputProps = {
  label: string;
  type: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
};

// 인증 링크에 필요한 props 타입을 정의
export type AuthLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};
