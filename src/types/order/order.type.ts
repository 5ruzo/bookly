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

export type TypeOrderedBook = {
  bookId: string | number;
  quantity: number;
};
export type TypePaymentsInfo = {
  name: TypeOrderForm['name'];
  // userId: string;
  // orderList: TypeOrderedBook[];
  items: string;
  amount: number;
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
