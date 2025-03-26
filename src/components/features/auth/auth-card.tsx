import { AuthCardProps } from '@/types/auth.type';
import Image from 'next/image';

const AuthCard: React.FC<AuthCardProps> = ({
  children,
  imageSrc = '/images/login-image.png',
  imageAlt = '회원가입 이미지',
}) => {
  return (
    <div className='flex min-h-screen items-start justify-center px-4 py-6'>
      <div className='w-full max-w-4xl rounded-xl bg-[var(--color-secondary)] flex flex-col md:flex-row overflow-hidden shadow-lg'>
        {/* 이미지 영역 - 모바일과 데스크톱에서 조건부 렌더링 */}
        <div className='hidden md:block md:w-1/2 relative'>
          <div className='relative w-full h-full min-h-[500px]'>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              style={{ objectFit: 'contain' }}
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          </div>
        </div>

        {/* 폼 영역 */}
        <div className='w-full md:w-[55%] p-6'>
          <div className='flex flex-col justify-center w-full h-full bg-[var(--color-white-light)] p-6 md:p-12 rounded-xl'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
