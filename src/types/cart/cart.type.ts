export type TypeCartBooks = {
  id: string;
  quantity: number;
  price: number;
  image_url: string;
  title: string;
  author: string;
};

export type TypeBookSummary = Pick<
  TypeCartBooks,
  'image_url' | 'title' | 'author'
>;

export type TypeCartItem = {
  id: TypeCartBooks['id'];
  quantity: TypeCartBooks['quantity'];
  price: TypeCartBooks['price'];
  bookInfo: TypeBookSummary;
};
