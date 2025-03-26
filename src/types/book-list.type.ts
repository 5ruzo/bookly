export type Book = {
  id: number;
  title: string;
  author: string;
  published_date: string;
  rating: number;
  price: string;
  best_rank: number;
  publisher: string;
  description: string;
  genre: string;
  image_url: string;
};

export type BookItem = Pick<
  Book,
  'id' | 'title' | 'author' | 'rating' | 'price' | 'description' | 'image_url'
>;
