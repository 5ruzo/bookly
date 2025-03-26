'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import Image from 'next/image';
import Link from 'next/link';
import { STRIP_BANNER_OPTIONS } from '@/constants/home.constant';
import { useGetImagesByStripBanners } from '@/lib/queries/use-get-images-by-strip-banners';
import { useEffect, useState } from 'react';
import { CarouselImages } from '@/types/home.type';

function StripBannersCarousel() {
  // 스트립 배너 캐러셀에 표시할 이미지 데이터
  const { data: imageList, isError, isLoading } = useGetImagesByStripBanners();
  const [stripBanners, setStripBanners] = useState<CarouselImages[] | null>(
    null
  );

  useEffect(() => {
    if (imageList && !isError) setStripBanners(imageList);
  }, [imageList, isError]);

  // 캐러셀 API 및 상태 관리를 위한 상태 변수
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  /**
   * 캐러셀 API가 설정되면 실행되는 이펙트
   * - 전체 슬라이드 개수 설정
   * - 현재 슬라이드 인덱스 설정
   * - 슬라이드 변경 시 현재 인덱스를 업데이트하는 이벤트 리스너 등록
   */
  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleSelectSlide = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  if (!stripBanners || isError || isLoading) return null;

  return (
    <div className='relative overflow-hidden'>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: STRIP_BANNER_OPTIONS.AUTO_ROLLING_TIME,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
          Fade(), // Fade 플러그인 사용
        ]}
      >
        <CarouselContent className='-ml-0 gap-0'>
          {stripBanners &&
            stripBanners.map((image) => (
              <CarouselItem className='relative pl-0' key={image.id}>
                <Link
                  href={image.link_url}
                  className='relative block w-full aspect-[4/1] md:aspect-[6/1] lg:aspect-[8/1]'
                >
                  <Image
                    src={image.image_url}
                    alt={image.title}
                    fill
                    sizes='(max-width: 768px) 768px, 100vw'
                    quality={95}
                    placeholder='blur'
                    blurDataURL={image.image_url}
                    style={{ objectFit: 'cover' }}
                  />
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
        {api && (
          <div className='flex justify-center items-center gap-2 mt-4'>
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleSelectSlide(index)}
                className={`w-1 h-1 md:w-2 md:h-2 rounded-full transition-all ${
                  current === index ? 'bg-gray' : 'bg-lightgray'
                }`}
                aria-label={`${index + 1}번 배너 이미지로 이동하기`}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  );
}

export default StripBannersCarousel;
