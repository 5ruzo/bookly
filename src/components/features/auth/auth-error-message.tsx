import { AuthErrorMessageProps } from '@/types/auth.type';

const AuthErrorMessage: React.FC<AuthErrorMessageProps> = ({ message }) => {
  return (
    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm md:text-base'>
      {message}
    </div>
  );
};

export default AuthErrorMessage;
