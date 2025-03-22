'use client';

import type React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { QuantityInputProps } from '@/types/detail.type';

const minimum = 1;
const maximum = 99;
const changeRange = 1;

export default function QuantityInput({ value, onChange }: QuantityInputProps) {
  const handleIncrement = () => {
    // 정해둔 최대 값보다 커지지 않음
    if (maximum !== undefined && value + changeRange > maximum) return;
    onChange(value + changeRange);
  };

  const handleDecrement = () => {
    // 정해둔 최소 값보다 작아지지 않음
    if (minimum !== undefined && value - changeRange < minimum) return;
    onChange(value - changeRange);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 변화 값을 state에 저장
    const newValue = e.target.value === '' ? minimum : Number(e.target.value);
    // 저장할 값의 유효성 검사
    if (isNaN(newValue)) return;
    if (maximum !== undefined && newValue < maximum) return;
    if (minimum !== undefined && newValue > minimum) return;
    onChange(newValue);
  };

  return (
    <div>
      <div className='space-y-4'>
        <div className='flex items-center gap-4'>
          <div className='flex h-10 border border-gray rounded-md overflow-hidden'>
            <input
              type='text'
              value={value}
              onChange={handleChange}
              className='w-full px-3 py-1 text-md focus:outline-none'
            />
            <div className='flex flex-col border-l border-gray'>
              <button
                type='button'
                onClick={handleIncrement}
                className='flex items-center justify-center h-5 w-8 active:bg-gray'
              >
                <ChevronUp size={14} />
              </button>
              <div className='border-t border-gray'></div>
              <button
                type='button'
                onClick={handleDecrement}
                className='flex items-center justify-center h-5 w-8 active:bg-gray'
              >
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
          <span className='text-sm text-gray'>현재 수량: {value}</span>
        </div>
      </div>
    </div>
  );
}
