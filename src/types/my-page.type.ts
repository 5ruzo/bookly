export type OrderDetailInfo = {
  id: number;
  created_at: string;
  user_id: string;
  total_price: number;
  order_details: OrderedBookInfoArray;
};

export type OrderedBookInfo = {
  id: number;
  books: {
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
  book_id: number;
  order_id: number;
  quantity: number;
};

type OrderedBookInfoArray = OrderedBookInfo[];

export type OrderDetailCardProps = {
  id: number;
  image_url: string;
  title: string;
  author: string;
  arrived: string;
  price: string;
  quantity: number;
};

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
