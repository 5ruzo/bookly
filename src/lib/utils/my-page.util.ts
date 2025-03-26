export const isMoreThanThreeDaysAgo = (dateStr: string): boolean => {
  // 입력받은 날짜 문자열을 Date 객체로 변환
  const targetDate = new Date(dateStr.split('T')[0]); // 'YYYY-MM-DD' 부분만 가져오기

  // 오늘 날짜를 Date 객체로 변환
  const today = new Date();

  // 오늘 날짜에서 3일 전 날짜를 계산
  const threeDaysAgo = new Date(today.setDate(today.getDate() - 3));

  // targetDate가 3일 전 날짜보다 이전인지를 비교하여 boolean 반환
  return targetDate < threeDaysAgo;
};

export const truncateText = (text: string): string => {
  if (text.length > 7) {
    return text.slice(0, 7) + '...';
  }
  return text;
};
