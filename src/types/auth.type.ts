// 사용자 데이터의 타입 정의
export type UserData = {
  id: string;
  email: string;
  phone?: string; // 전화번호는 선택 사항
};

// 인증 상태를 관리할 Zustand 스토어의 타입 정의
export type AuthState = {
  user: UserData | null; // 로그인한 사용자 정보
  isLoading: boolean; // 로딩 상태
  error: string | null; // 오류 메시지
  isAuthenticated: boolean; // 인증 상태
  signUp: (email: string, password: string, phone: string) => Promise<void>; // 회원가입 메서드
  signIn: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>; // 로그인 메서드
  signOut: () => Promise<void>; // 로그아웃 메서드
  checkEmailExists: (email: string) => Promise<boolean>; // 이메일 중복 체크 메서드
  resetPassword: (email: string) => Promise<void>; // 비밀번호 재설정 메서드
  verifyPhone: (phone: string) => Promise<boolean>; // 전화번호 확인 메서드
};
