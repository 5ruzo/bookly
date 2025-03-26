export type LikeList = {
  id: number;
  book_id: number;
  user_id: string;
  book: {
    id: number;
    genre: string;
    price: string;
    title: string;
    author: string;
    rating: number;
    best_rank: number;
    image_url: string;
    publisher: string;
    description: string;
    published_date: string;
  };
};
