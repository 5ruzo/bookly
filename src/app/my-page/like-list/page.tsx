import BookCard from '@/components/ui/book-card';

// supabase 데이터 추가되면 불러오는 로직 추가
const dummyData = [
  {
    id: 1,
    image_url:
      'https://image.aladin.co.kr/product/36042/18/cover500/k062037848_1.jpg',
    title: '1번 책',
    rating: 9,
    author: '저자',
    description: '설명은 조금 긴게 좋으니까요',
    price: '12000',
  },
  {
    id: 2,
    image_url:
      'https://image.aladin.co.kr/product/23842/90/cover500/k502639387_2.jpg',
    title: '2번 책',
    rating: 6,
    author: '저자',
    description: '설명은 조금 긴게 좋으니까요',
    price: '12000',
  },
  {
    id: 3,
    image_url:
      'https://image.aladin.co.kr/product/5100/19/cover500/8925554992_2.jpg',
    title: '3번 책',
    rating: 10,
    author: '저자',
    description: '설명은 조금 긴게 좋으니까요',
    price: '12000',
  },
  {
    id: 4,
    image_url:
      'https://image.aladin.co.kr/product/36023/11/cover500/k822037028_1.jpg',
    title: '4번 책',
    rating: 4,
    author: '저자',
    description: '설명은 조금 긴게 좋으니까요',
    price: '12000',
  },
];

export default function LikeList() {
  return (
    <div className='flex-1 min-w-[1000px]'>
      <div className='mb-6'>
        <h3 className='flex items-center text-lg font-medium'>
          <span className='mr-2'>▶</span> 찜목록
        </h3>
      </div>

      <div className='grid gap-6 grid-cols-3'>
        {dummyData.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            image_url={book.image_url}
            title={book.title}
            rating={book.rating}
            author={book.author}
            description={book.description}
            price={book.price}
          />
        ))}
      </div>
    </div>
  );
}
