export type TypeOrderForm = {
  name: string;
  phoneNumber: string;
  address: string;
  detailAddress: string;
  zoneCode: string;
};

export {};

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
