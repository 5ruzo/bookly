import { AuthButtonProps } from '@/types/auth.type';

const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  type = 'submit',
  disabled = false,
  onClick,
  variant = 'primary',
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-gray-800',
    kakao:
      'bg-[#fee500] text-black bg-[url(https://storage.keepgrow.com/admin/campaign/20200611043456590.svg)] bg-no-repeat bg-[22px] flex items-center justify-center gap-2',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full py-3 rounded-xl transition ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default AuthButton;
