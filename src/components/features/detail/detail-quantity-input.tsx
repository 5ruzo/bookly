'use client';

import type React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { QuantityInputProps } from '@/types/detail.type';
import { sliceNumber } from '@/lib/utils/detail.util';
import { formatNumberWithCommas } from '@/lib/utils/common.util';

const minimum = 1;
const maximum = 99;
const changeRange = 1;

export default function QuantityInput({
  value,
  onChange,
  price,
}: QuantityInputProps) {
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
    // 값이 숫자가 아니면 무시하지 않고 빈 값은 허용
    const newValue = e.target.value === '' ? '' : Number(e.target.value);
    if (isNaN(newValue as number)) return;
    onChange(newValue as number);
  };

  const handleBlur = () => {
    // 유효성 검사 후 값 조정
    if (value < minimum) {
      onChange(minimum);
    } else if (value > maximum) {
      onChange(maximum);
    }
  };

  return (
    <div className='h-1/5 content-center'>
      <div className='flex items-center gap-4'>
        <div className='flex h-6 md:h-10 border border-gray rounded-md overflow-hidden w-full max-w-20'>
          <input
            type='text'
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            className='px-3 w-full py-1 text-md focus:outline-none'
          />
          <div className='opacity-0 md:opacity-100 flex flex-col border-l border-gray'>
            <button
              type='button'
              onClick={handleIncrement}
              className='flex items-center justify-center h-5 w-6 active:bg-gray'
            >
              <ChevronUp size={14} />
            </button>
            <div className='border-t border-gray'></div>
            <button
              type='button'
              onClick={handleDecrement}
              className='flex items-center justify-center h-5 w-6 active:bg-gray'
            >
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
        <span className='text-ss md:text-sm text-gray'>
          총 금액 :{sliceNumber(formatNumberWithCommas(Number(price) * value))}
        </span>
      </div>
    </div>
  );
}
