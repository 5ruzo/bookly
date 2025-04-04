import { Dispatch, SetStateAction } from 'react';

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

export type ButtonAreaProps = Pick<
  Book,
  'title' | 'price' | 'id' | 'author' | 'image_url'
> & {
  quantity: number;
  like: boolean;
  setLike: Dispatch<SetStateAction<boolean>>;
  userId: string | undefined;
};

export type ProductInfoProps = {
  data: Book;
};

export type LikeButtonProps = Pick<
  ButtonAreaProps,
  'like' | 'setLike' | 'id' | 'userId'
>;

export type CheckLikeBook = {
  book_id: number;
  id: number;
  user_id: string;
};
