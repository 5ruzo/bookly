export type UserData = {
  id: string;
  email: string;
  phone?: string;
};

export type AuthState = {
  user: UserData | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, phone: string) => Promise<void>;
  signIn: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;
  signOut: () => Promise<void>;
  checkEmailExists: (email: string) => Promise<boolean>;
};
