'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

export default function LikeButton() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button
      className={`${isFavorite ? 'text-red-500 border-primary' : 'text-primary border-primary'} focus:outline-none border-[1px] rounded-xl h-12 w-12 md:h-14 md:w-14 p-0 flex items-center justify-center`}
      onClick={() => {
        setIsFavorite(!isFavorite);
        if (isFavorite) alert('찜 해제!');
        if (!isFavorite) alert('찜!');
      }}
    >
      <Heart
        size={24}
        strokeWidth={1}
        className={` ${isFavorite ? 'fill-red-500' : ''}`}
      />
      <span className='sr-only'>좋아요</span>
    </button>
  );
}
