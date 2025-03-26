import { User } from '@supabase/supabase-js';
import { ReactNode } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

// 사용자 데이터에 대한 타입을 정의해요. Supabase의 User 객체를 기반으로
export type UserData = {
  id: string; // 사용자의 고유 아이디
  email: string; // 사용자의 이메일
  phone?: string; // 사용자의 전화번호 (선택적)
};

// Zustand를 사용해 인증 상태를 관리할 때 사용할 스토어의 타입이에요.
export type UserState = {
  user: User | null; // 현재 로그인된 사용자 (로그인하지 않았으면 null)
  isLogin: boolean; // 사용자가 로그인 상태인지 여부
  setUser: (user: User) => void; // 사용자가 로그인할 때 호출되는 함수
  clearUser: () => void; // 로그아웃할 때 호출되어 사용자 정보를 초기화하는 함수
  error: string | null; // 로그인 또는 인증 중 오류 메시지 (없으면 null)
  setError: (message: string) => void; // 오류 메시지를 설정하는 함수
};

// 인증 버튼에 필요한 props 타입을 정의한 거예요.
export type AuthButtonProps = {
  children: ReactNode; // 버튼에 들어갈 내용 (예: 텍스트)
  type?: 'submit' | 'button'; // 버튼 타입 ('submit'이나 'button' 중 하나)
  disabled?: boolean; // 버튼이 비활성화 상태인지 여부
  onClick?: () => void; // 버튼 클릭 시 호출될 함수
  variant?: 'primary' | 'kakao'; // 버튼의 스타일 종류 ('primary' 또는 'kakao')
  className?: string; // 추가적인 CSS 클래스 이름
};

// 인증 카드에 필요한 props 타입을 정의한 거예요. 이미지가 있을 수도 있고 없을 수도 있어요.
export type AuthCardProps = {
  children: ReactNode; // 카드 안에 들어갈 내용 (예: 텍스트, 버튼)
  imageSrc?: string; // 카드에 표시할 이미지의 경로 (있다면)
  imageAlt?: string; // 이미지에 대한 설명 텍스트 (선택적)
};

// 인증 오류 메시지를 표시할 컴포넌트에 필요한 props 타입이에요.
export type AuthErrorMessageProps = {
  message: string; // 표시할 오류 메시지 텍스트
};

// 인증 입력 필드를 위한 props 타입이에요. react-hook-form과 함께 사용할 거예요.
export type AuthInputProps = {
  label: string; // 입력 필드의 레이블 (예: '이메일', '비밀번호')
  type: string; // 입력 필드의 타입 ('text', 'password' 등)
  register: UseFormRegisterReturn; // react-hook-form의 register 함수 (폼과 연동)
  error?: FieldError; // 입력 필드에 오류가 있을 경우 오류 정보
  placeholder?: string; // 입력 필드의 placeholder 텍스트 (선택적)
  autoComplete?: string; // 자동 완성 옵션 (선택적)
  disabled?: boolean;
};

// 인증 링크에 필요한 props 타입을 정의한 거예요.
export type AuthLinkProps = {
  href: string; // 링크가 가리킬 URL
  children: React.ReactNode; // 링크에 들어갈 텍스트 또는 다른 컴포넌트
  className?: string; // 추가적인 CSS 클래스 이름 (선택적)
};
