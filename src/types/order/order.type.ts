export type TypeOrderForm = {
  name: string;
  phoneNumber: string;
  address: string;
  detailAddress: string;
  zoneCode: string;
};

export {}; // ⬅️ 이게 중요함! 해당 파일을 모듈로 만듦

declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: Record<string, string>) => void;
      }) => {
        open: () => void;
      };
    };
  }
}
