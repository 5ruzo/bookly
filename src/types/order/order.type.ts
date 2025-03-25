export type TypeOrderForm = {
  name: string;
  phoneNumber: string;
  address: string;
  detailAddress: string;
  zoneCode: string;
};

export type TypeFormField = {
  id: keyof TypeOrderForm;
  label: string;
  type?: string;
  placeholder?: string;
};

export type TypeAddressInfo = Pick<TypeOrderForm, 'address' | 'zoneCode'>;

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
