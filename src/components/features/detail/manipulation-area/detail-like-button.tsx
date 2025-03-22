'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LikeButton() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Button
      variant='outline'
      className={`${isFavorite ? 'bg-primary text-white border-primary' : 'text-primary border-primary'} rounded-xl h-14 w-14 p-0 flex items-center justify-center`}
      onClick={() => {
        setIsFavorite(!isFavorite);
        if (isFavorite) alert('찜 해제!');
        if (!isFavorite) alert('찜!');
      }}
    >
      <Heart className={`h-6 w-6 ${isFavorite ? 'fill-white' : ''}`} />
      <span className='sr-only'>좋아요</span>
    </Button>
  );
}
