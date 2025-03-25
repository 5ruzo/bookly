'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useGetImagesByMainCarousel } from '@/lib/queries/use-get-images-by-main-carousel';
import { MAIN_CAROUSEL_OPTIONS } from '@/constants/home.constant';

function MainCarousel() {
  // 메인 캐러셀에 표시할 이미지 데이터
  const { data: ImageList, isError, isLoading } = useGetImagesByMainCarousel();

  // 캐러셀 API 및 현재 상태를 관리하는 상태 변수
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  /**
   * 캐러셀 API가 설정되면 실행되는 이펙트
   * - 전체 슬라이드 개수를 설정
   * - 현재 슬라이드 인덱스를 설정
   * - 슬라이드 변경 시 현재 인덱스를 업데이트하는 이벤트 리스너 등록
   */
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  if (isError || isLoading) return null;

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
            delay: MAIN_CAROUSEL_OPTIONS.AUTO_ROLLING_TIME,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent className='-ml-0 gap-0'>
          {ImageList &&
            ImageList.map((image) => (
              <CarouselItem className='relative  pl-0' key={image.id}>
                <Link
                  href={image.link_url}
                  className='block relative w-full h-full'
                >
                  <Image
                    src={image.image_url}
                    alt={image.title}
                    width={MAIN_CAROUSEL_OPTIONS.WIDTH}
                    height={MAIN_CAROUSEL_OPTIONS.HEIGHT}
                    priority
                    className='object-cover aspect-[2/1] md:aspect-[4/1]'
                  />
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>

        <button
          onClick={scrollPrev}
          className='absolute left-0 -translate-x-1 top-1/2 -translate-y-1/2 flex w-6 h-10 md:h-20 md:w-12 items-center justify-center bg-zinc-900/50 z-10'
          aria-label='이전 슬라이드'
        >
          <ChevronLeft
            size={MAIN_CAROUSEL_OPTIONS.NAVIGATION_ICON_SIZE}
            strokeWidth={MAIN_CAROUSEL_OPTIONS.NAVIGATION_ICON_STROKE_WIDTH}
            stroke='var(--color-white-dark)'
          />
        </button>

        <button
          onClick={scrollNext}
          className='absolute right-0 translate-x-1 top-1/2 -translate-y-1/2 flex  w-6 h-10 md:h-20 md:w-12 items-center justify-center bg-zinc-900/50 z-10'
          aria-label='다음 슬라이드'
        >
          <ChevronRight
            size={MAIN_CAROUSEL_OPTIONS.NAVIGATION_ICON_SIZE}
            strokeWidth={MAIN_CAROUSEL_OPTIONS.NAVIGATION_ICON_STROKE_WIDTH}
            stroke='var(--color-white-dark)'
          />
        </button>
        <div className='absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 text-white-dark px-3 py-1 bg-zinc-900/30 rounded-xl text-ss md:text-sm'>
          <span className='font-semibold text-white-light'>{current + 1}</span>
          <span> / {count}</span>
        </div>
      </Carousel>
    </div>
  );
}

export default MainCarousel;
