import { AuthInputProps } from '@/types/auth.type';

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  type,
  register,
  error,
  placeholder,
  autoComplete,
}) => {
  return (
    <div>
      <label className='block text-base'>
        {label}
        <input
          type={type}
          {...register}
          className='w-full px-4 py-3 border rounded-xl text-base mt-2'
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      </label>
      <div className='block left-0 right-0 h-6 mt-1'>
        {error && <span className='text-red-500'>{error.message}</span>}
      </div>
    </div>
  );
};

export default AuthInput;
