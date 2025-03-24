interface Window {
  daum: {
    Postcode: new (options: {
      oncomplete: (data: Record<string, string>) => void;
    }) => {
      open: () => void;
    };
  };
}

export type down = {
  test: string;
};
