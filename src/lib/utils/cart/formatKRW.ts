/**
 * 인자로 넣은 금액을 원화로 반환해 주는 함수
 * @param price - 포맷팅 할 숫자
 * @returns 원화로 포맷팅 된 금액
 * @example
 * const test = formatKRW(1500); //1,500
 */
export const formatKRW = (price: number): string => {
  return price.toLocaleString('ko-KR');
};
