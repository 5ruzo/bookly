import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 숫자를 천 단위 구분자로 포맷팅하여 반환하는 함수
 *
 * @param {number | undefined} number - 포맷팅할 숫자. `undefined`일 경우 0을 반환
 * @returns {string} 천 단위로 구분된 숫자 문자열
 * @example
 * formatNumberWithCommas(1234567); // "1,234,567"
 */
export function formatNumberWithCommas(number: number | undefined): string {
  if (!number) {
    return '0';
  }
  return number.toLocaleString();
}

/**
 * 평점을 0에서 5 사이로 정규화하는 함수
 *
 * @param {number} rating - 입력받은 평점 (0 ~ 10)
 * @returns {number} 정규화된 평점 (0 ~ 5)
 * @example
 * normalizedRating(8); // 4
 */
export function normalizedRating(rating: number): number {
  return Math.max(0, Math.min(10, rating)) / 2;
}

/**
 * 주어진 클래스들을 병합하여 반환하는 함수
 * `clsx`로 클래스명을 처리하고, `twMerge`로 중복된 Tailwind 클래스를 병합
 *
 * @param {...ClassValue[]} inputs - 병합할 클래스들
 * @returns {string} 병합된 클래스 문자열
 * @example
 * mergeClasses('bg-red-500', 'text-white', 'hover:bg-red-700');
 */
export function mergeClasses(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
