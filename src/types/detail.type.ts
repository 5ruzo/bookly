export type Book = {
  id: number;
  title: string;
  author: string;
  published_date: string;
  rating: number;
  description: string;
  genre: string;
  image_url: string;
  price: string;
  best_rank: number;
  publisher: string;
};

export type BookList = Book[];

export type RatingProps = {
  rating: number;
};

export type QuantityInputProps = {
  value: number;
  onChange: (value: number) => void;
  price: string;
};

export type ButtonAreaProps = Pick<Book, 'title' | 'price'> & {
  quantity: number;
};

export type ProductInfoProps = {
  data: Book;
  price: string;
};
