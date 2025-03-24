'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { signupSchema } from '@/lib/utils/auth/schemas';

const SignUp = () => {
  const { signUp, checkEmailExists, verifyPhone, isLoading, error } =
    useAuthStore(); // 인증 관련 store에서 필요한 함수들 가져오기
  const router = useRouter();
  const [emailChecked, setEmailChecked] = useState(false); // 이메일 중복 검사 여부 상태
  const [emailCheckMessage, setEmailCheckMessage] = useState<string | null>(
    null
  ); // 이메일 검사 메시지
  const [phoneVerified, setPhoneVerified] = useState(false); // 휴대폰 인증 여부 상태
  const [phoneVerifyMessage, setPhoneVerifyMessage] = useState<string | null>(
    null
  ); // 휴대폰 인증 메시지

  const { register, handleSubmit, formState, getValues, setValue, trigger } =
    useForm({
      mode: 'onBlur', // 입력이 끝날 때마다 유효성 검사
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

    const exists = await checkEmailExists(email); // 이메일 중복 여부 확인
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

    const verified = await verifyPhone(phone); // 전화번호 인증 확인
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
      await signUp(values.email, values.password, values.phone); // 회원가입 요청
      router.push('/'); // 홈페이지로 리다이렉트
    } catch (err) {
      console.error('Sign up error:', err); // 에러 처리
    }
  };

  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-1 items-center justify-center p-6'>
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
            <div className='w-[100%] bg-white p-8 rounded-xl'>
              <h2 className='text-xl font-semibold mb-6 text-left'>Sign Up</h2>

              {error && (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
                  {error}
                </div>
              )}

              <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
                {/* 이메일 입력 */}
                <div>
                  <label className='block text-base mb-2'>이메일</label>
                  <div className='flex gap-4'>
                    <input
                      {...register('email')}
                      type='email'
                      placeholder='Email'
                      className='w-10/12 px-4 py-3 border rounded-xl var(--color-white-light) text-base'
                      autoComplete='email'
                    />
                    <button
                      type='button'
                      className={`border rounded-lg ${emailChecked ? 'bg-green-500 text-white' : 'bg-[var(--color-gray)]'} w-16`}
                      onClick={handleEmailCheck}
                    >
                      중복검사
                    </button>
                  </div>
                  <div className='ml-1 mt-2 text-red-500'>
                    {formState.errors.email && (
                      <span>{formState.errors.email.message as string}</span>
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
                <div>
                  <label className='block text-base mb-2'>비밀번호</label>
                  <input
                    type='password'
                    {...register('password')}
                    className='w-10/12 px-4 py-3 border rounded-xl bg-[var(--color-white-light)] text-base'
                    placeholder='Password'
                    autoComplete='new-password'
                  />
                  <div className='ml-1 mt-2 text-red-500'>
                    {formState.errors.password && (
                      <span>{formState.errors.password.message as string}</span>
                    )}
                  </div>
                </div>

                {/* 비밀번호 확인 입력 */}
                <div>
                  <label className='block text-base mb-2'>비밀번호 확인</label>
                  <input
                    id='confirmPassword'
                    type='password'
                    {...register('confirmPassword')}
                    className='w-10/12 px-4 py-3 border rounded-xl var(--color-gray) text-base'
                    placeholder='Password'
                    autoComplete='current-password'
                  />
                  <div className='ml-1 mt-2 text-red-500'>
                    {formState.errors.confirmPassword && (
                      <span>
                        {formState.errors.confirmPassword.message as string}
                      </span>
                    )}
                  </div>
                </div>

                {/* 휴대폰 번호 입력 */}
                <div>
                  <label className='block text-base mb-2'>휴대폰 번호</label>
                  <div className='flex gap-4'>
                    <input
                      type='text'
                      {...register('phone')}
                      className='w-10/12 px-4 py-3 border rounded-xl bg-gray-100 text-base'
                      placeholder="'-' 없이 입력"
                    />
                    <button
                      type='button'
                      className={`border rounded-lg ${phoneVerified ? 'bg-green-500 text-white' : 'bg-[gray]'} w-16`}
                      onClick={handlePhoneVerify}
                    >
                      인증
                    </button>
                  </div>
                  <div className='ml-1 mt-2'>
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
                  disabled={!formState.isValid || isLoading}
                  type='submit'
                  className='w-10/12 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition mb-2'
                >
                  {isLoading ? '처리 중...' : '회원가입'}
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
