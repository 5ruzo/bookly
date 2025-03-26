import { AuthLinkProps } from '@/types/auth.type';
import Link from 'next/link';

const AuthLink: React.FC<AuthLinkProps> = ({
  href,
  children,
  className = 'text-blue-600 hover:underline',
}) => {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export default AuthLink;
