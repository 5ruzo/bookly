import OrderDetailCard from '@/components/features/my-page/order-detail-card';

export default function OrderDetails() {
  const dummyData = [
    {
      id: 1,
      image_url:
        'https://image.aladin.co.kr/product/36042/18/cover500/k062037848_1.jpg',
      title: '1번 책',
      author: '저자',
      arrived: true,
      price: '22000',
      quantity: 1,
    },
    {
      id: 2,
      image_url:
        'https://image.aladin.co.kr/product/23842/90/cover500/k502639387_2.jpg',
      title: '1번 책',
      author: '저자',
      arrived: false,
      price: '22000',
      quantity: 2,
    },
    {
      id: 3,
      image_url:
        'https://image.aladin.co.kr/product/5100/19/cover500/8925554992_2.jpg',
      title: '1번 책',
      author: '저자',
      arrived: false,
      price: '27000',
      quantity: 1,
    },
    {
      id: 4,
      image_url:
        'https://image.aladin.co.kr/product/36023/11/cover500/k822037028_1.jpg',
      title: '1번 책',
      author: '저자',
      arrived: true,
      price: '12000',
      quantity: 4,
    },
  ];
  return (
    <div className='flex-1 min-w-[1000px]'>
      <div className='mb-6'>
        <h3 className='flex items-center text-lg font-medium'>
          <span className='mr-2'>▶</span> 주문 내역
        </h3>
      </div>
      {dummyData ? (
        <div className='flex flex-col pb-6'>
          {dummyData.map((order) => (
            <>
              <OrderDetailCard
                id={order.id}
                image_url={order.image_url}
                title={order.title}
                author={order.author}
                arrived={order.arrived}
                price={order.price}
                quantity={order.quantity}
              />
              <hr className='my-6' />
            </>
          ))}
          <div className='text-mlg text-gray text-center'>
            모든 주문 내역을 확인하셨습니다.
          </div>
        </div>
      ) : (
        <div className='text-mlg text-gray text-center pb-6'>
          주문 내역이 없습니다.
        </div>
      )}
    </div>
  );

