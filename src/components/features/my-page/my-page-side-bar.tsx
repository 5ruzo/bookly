import Link from 'next/link';

export default function MyPageSideBar() {
  const myPageList = [
    { id: '찜 목록', url: '/my-page/like-list' },
    { id: '주문 내역', url: '/my-page/order-details' },
  ];
  return (
    <div>
      <h1 className='py-2 text-lg'>마이 페이지</h1>
      <nav className='flex flex-col bg-white-dark gap-y-1'>
        {myPageList.map((page) => (
          <li id={page.url}>
            <Link href={page.url}>
              {page.id} {' >'}
            </Link>
          </li>
        ))}
      </nav>
    </div>
  );
}
