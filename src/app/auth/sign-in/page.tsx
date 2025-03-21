"use client";

import Image from "next/image";
import React from "react";
import loginImage from "../../../../public/images/login-image.png";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full h-[700px] max-h-[700px] max-w-[1000px] rounded-xl bg-[#faf7f2] flex overflow-hidden">
          {/* 이미지 영역 */}
          <div className="w-[45%] relative flex items-center justify-center">
            <div className="relative w-full h-full max-w-full max-h-full">
              <Image
                src={loginImage}
                alt="로그인 이미지"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </div>

          {/* 오른쪽 폼 */}
          <div className="p-6 w-[55%] ">
            <div className="w-[100%] h-full bg-white p-12 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6 text-left">Sign In</h2>

              <form className="space-y-5 mt-16">
                <div>
                  <label className="block text-base mb-2">이메일</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border rounded-xl bg-gray-100 text-base"
                  />
                </div>

                <div>
                  <label className="block text-base mb-2">비밀번호</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border rounded-xl bg-gray-100 text-base"
                  />
                </div>

                <div className="flex items-center justify-between text-base">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe">자동 로그인</label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-gray-500 hover:underline"
                  >
                    비밀번호 찾기
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
                >
                  로그인
                </button>

                <button
                  type="button"
                  className="w-full py-3 bg-[#03C75A] text-white rounded-xl flex items-center justify-center gap-2"
                >
                  <span className="font-bold">N</span> 네이버 로그인
                </button>
              </form>

              <div className="mt-6 text-center text-sm">
                <p>
                  계정이 없으신가요?{" "}
                  <Link
                    href="/auth/sign-up"
                    className="text-blue-600 hover:underline"
                  >
                    회원가입
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

export default SignIn;
