import normalizedRating from '@/lib/utils/detail/normalized-rating';
import { RatingProps } from '@/types/detail.type';
import { Star } from 'lucide-react';

export function Rating({ rating }: RatingProps) {
  const starSize = 25;

  const ratingScore = normalizedRating(rating);

  // 온전한 별 5개짜리 배열
  const stars = Array(5).fill(0);

  return (
    <div className='flex items-center'>
      {stars.map((_, index) => {
        const starValue = index + 1;

        // 별이 온전한지 절반짜리 별인지 비어있는지 판단하는 조건문
        if (starValue <= ratingScore) {
          // 온전한 별
          return (
            <Star
              key={index}
              size={starSize}
              className='text-yellow-400 fill-yellow-400'
            />
          );
        } else if (starValue - 0.5 <= ratingScore) {
          // 절반짜리 별
          return (
            <div key={index} className='relative'>
              {/* 비워진 별을 뒤로 */}
              <Star size={starSize} className='text-yellow-400' />
              {/* 절반 채워진 별은 앞으로 둠으로 별이 절반 비어있음을 표시 */}
              <div className='absolute top-0 left-0 w-1/2 overflow-hidden'>
                <Star
                  size={starSize}
                  className='text-yellow-400 fill-yellow-400'
                />
              </div>
            </div>
          );
        } else {
          // 비어있는 별
          return (
            <Star key={index} size={starSize} className='text-yellow-400' />
          );
        }
      })}
    </div>
  );
}
