import { ReactNode } from 'react';

export type CardForCarousel = {
  id: number;
  image_url: string;
  title: string;
  author: string;
  description: string;
  price: string;
  rating: number;
};

export type BestSeller = CardForCarousel;
export type RecommededBooks = CardForCarousel;

export type SectionContainerProps = {
  title: string;
  path?: string;
  className?: string;
  children: ReactNode;
};
