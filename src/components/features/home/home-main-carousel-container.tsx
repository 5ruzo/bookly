import MainCarousel from './home-main-carousel';
import { fetchGetImagesByMainCarousel } from '@/lib/api/home.api';

export default async function MainCarouselContainer() {
  const data = await fetchGetImagesByMainCarousel();

  return <MainCarousel imageList={data} />;
}
