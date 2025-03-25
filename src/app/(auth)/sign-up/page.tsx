'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signupSchema } from '@/lib/utils/auth/schemas';
import { authService } from '@/lib/api/authService';
import { useAuthStore } from '@/store/useAuthStore';

const SignUp = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const [emailChecked, setEmailChecked] = useState(false); // 이메일 중복 검사 여부 상태
  const [emailCheckMessage, setEmailCheckMessage] = useState<string | null>(
    null
  ); // 이메일 검사 메시지
  const [phoneVerified, setPhoneVerified] = useState(false); // 휴대폰 인증 여부 상태
  const [phoneVerifyMessage, setPhoneVerifyMessage] = useState<string | null>(
    null
  ); // 휴대폰 인증 메시지

  const { register, handleSubmit, formState, getValues, trigger } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    resolver: zodResolver(signupSchema), // Zod로 입력 값 유효성 검사
  });

  // 이메일 중복 검사 함수
  const handleEmailCheck = async () => {
    const email = getValues('email'); // 입력된 이메일 값 가져오기

    const isValid = await trigger('email'); // 이메일 유효성 검사
    if (!isValid) return; // 유효하지 않으면 종료

    const exists = await authService.checkEmailExists(email); // 이메일 중복 여부 확인
    if (exists) {
      setEmailChecked(false);
      setEmailCheckMessage('이미 사용 중인 이메일입니다.');
    } else {
      setEmailChecked(true);
      setEmailCheckMessage('사용 가능한 이메일입니다.');
    }
  };

  // 휴대폰 인증 함수
  const handlePhoneVerify = async () => {
    const phone = getValues('phone'); // 입력된 전화번호 값 가져오기

    const isValid = await trigger('phone'); // 전화번호 유효성 검사
    if (!isValid) return; // 유효하지 않으면 종료

    const verified = await authService.verifyPhone(phone); // 전화번호 인증 확인
    if (verified) {
      setPhoneVerified(true);
      setPhoneVerifyMessage('인증이 완료되었습니다.');
    } else {
      setPhoneVerified(false);
      setPhoneVerifyMessage('인증에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 회원가입 폼 제출 함수
  const onSubmit = async (values: FieldValues) => {
    if (!emailChecked) {
      setEmailCheckMessage('이메일 중복 검사를 해주세요.');
      return; // 이메일 중복 검사를 하지 않으면 제출하지 않음
    }

    if (!phoneVerified) {
      setPhoneVerifyMessage('휴대폰 인증을 해주세요.');
      return; // 휴대폰 인증을 하지 않으면 제출하지 않음
    }

    try {
      const { data, error } = await authService.signUp(
        values.email,
        values.password,
        values.phone
      ); // 회원가입 요청

      if (error) {
        console.error('회원가입 에러:', error);
        alert('회원가입 실패!');
      }

      if (data?.user) {
        setUser(data.user);
        alert('회원가입 성공!');
        router.push('/');
      }
    } catch (err) {
      console.error('Sign up error:', err);
    }
  };

  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-1 items-start justify-center p-6'>
        <div className='w-full h-[700px] max-h-[700px] max-w-[1000px] rounded-xl bg-[var(--color-secondary)] flex overflow-hidden'>
          {/* 이미지 영역 */}
          <div className='w-[45%] relative flex items-center justify-center'>
            <div className='relative w-full h-full max-w-full max-h-full'>
              <Image
                src='/images/sign-up-image.png'
                alt='회원가입 이미지'
                fill
                priority
                style={{ objectFit: 'contain' }}
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </div>
          </div>

          {/* 오른쪽 폼 */}
          <div className='p-6 w-[55%]'>
            <div className='flex flex-col justify-center w-[100%] h-full bg-[var(--color-white-light)] p-8 rounded-xl'>
              <h2 className='text-2xl mb-6 text-left'>회원가입</h2>

              <form className='space-y-0' onSubmit={handleSubmit(onSubmit)}>
                {/* 이메일 입력 */}
                <div className='relative'>
                  <label className='block text-base'>이메일</label>
                  <div className='flex gap-4'>
                    <input
                      {...register('email')}
                      type='email'
                      placeholder='Email'
                      className='w-10/12 px-4 py-3 border rounded-xl text-base'
                      autoComplete='email'
                    />
                    <button
                      type='button'
                      className={`border rounded-lg ${emailChecked ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-white-light)]'} w-16`}
                      onClick={handleEmailCheck}
                    >
                      중복검사
                    </button>
                  </div>
                  <div className='block left-0 right-0 h-6 mt-1'>
                    {formState.errors.email && (
                      <span className='text-red-500'>
                        {formState.errors.email.message as string}
                      </span>
                    )}
                    {!formState.errors.email && emailCheckMessage && (
                      <span
                        className={
                          emailChecked ? 'text-green-500' : 'text-red-500'
                        }
                      >
                        {emailCheckMessage}
                      </span>
                    )}
                  </div>
                </div>

                {/* 비밀번호 입력 */}
                <div className='relative'>
                  <label className='block text-base'>비밀번호</label>
                  <input
                    type='password'
                    {...register('password')}
                    className='w-10/12 px-4 py-3 border rounded-xl text-base'
                    placeholder='Password'
                    autoComplete='new-password'
                  />
                  <div className='block left-0 right-0 h-6 mt-1'>
                    {formState.errors.password && (
                      <span className='text-red-500'>
                        {formState.errors.password.message as string}
                      </span>
                    )}
                  </div>
                </div>

                {/* 비밀번호 확인 입력 */}
                <div className='relative'>
                  <label className='block text-base'>비밀번호 확인</label>
                  <input
                    id='confirmPassword'
                    type='password'
                    {...register('confirmPassword')}
                    className='w-10/12 px-4 py-3 border rounded-xl text-base'
                    placeholder='Password'
                    autoComplete='current-password'
                  />
                  <div className='block left-0 right-0 h-6 mt-1'>
                    {formState.errors.confirmPassword && (
                      <span className='text-red-500'>
                        {formState.errors.confirmPassword.message as string}
                      </span>
                    )}
                  </div>
                </div>

                {/* 휴대폰 번호 입력 */}
                <div className='relative'>
                  <label className='block text-base'>휴대폰 번호</label>
                  <div className='flex gap-4'>
                    <input
                      type='text'
                      {...register('phone')}
                      className='w-10/12 px-4 py-3 border rounded-xl text-base'
                      placeholder="'-' 없이 입력"
                    />
                    <button
                      type='button'
                      className={`border rounded-lg ${phoneVerified ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-white-light)]'} w-16`}
                      onClick={handlePhoneVerify}
                    >
                      인증
                    </button>
                  </div>
                  <div className='block left-0 right-0 h-6 mt-1'>
                    {formState.errors.phone && (
                      <p className='text-red-500'>
                        {formState.errors.phone.message as string}
                      </p>
                    )}
                    {!formState.errors.phone && phoneVerifyMessage && (
                      <p
                        className={
                          phoneVerified ? 'text-green-500' : 'text-red-500'
                        }
                      >
                        {phoneVerifyMessage}
                      </p>
                    )}
                  </div>
                </div>

                {/* 회원가입 버튼 */}
                <button
                  disabled={!formState.isValid}
                  type='submit'
                  className='w-10/12 py-3 bg-[var(--color-primary)] text-white rounded-xl  transition mb-2'
                >
                  회원가입
                </button>
              </form>

              {/* 로그인 링크 */}
              <div className='mt-6 text-center text-sm'>
                <p>
                  이미 계정이 있으신가요?{' '}
                  <Link
                    href='/sign-in'
                    className='text-blue-600 hover:underline'
                  >
                    로그인
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
