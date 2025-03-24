'use client';
import DataTable from '@/components/features/common/data-table';
import { Checkbox } from '@/components/ui/checkbox';
import { formatKRW } from '@/lib/utils/cart/formatKRW';
import { TypeCartItem } from '@/types/cart/cart.type';
import { ColumnDef } from '@tanstack/react-table';
import BookSummary from './book-summary';

const getSumPrice = (
  quantity: TypeCartItem['quantity'],
  price: TypeCartItem['price']
) => {
  return formatKRW(quantity * price);
};

export default function CartTable({
  cartBookList,
}: {
  cartBookList: TypeCartItem[];
}) {
  const columns: (ColumnDef<TypeCartItem> & { className?: string })[] = [
    {
      id: 'select',
      header: () => <span className='sr-only'>선택 여부</span>,
      cell: () => <Checkbox />,
      className:
        'w-auto flex items-center justify-center self-stretch mx-2 sm:ml-0 sm:mr-4 sm:mt-0',
    },
    {
      accessorKey: 'bookInfo',
      header: () => <span className='sr-only'>책 정보</span>,
      cell: ({ row }) => <BookSummary book={row.original.bookInfo} />,
      className: 'flex-1 sm:w-3/5',
    },
    {
      accessorKey: 'price-quantity',
      header: () => <span className='sr-only'>단가 및 수량</span>,
      cell: ({ row }) => {
        return (
          <>
            <span className='mb-5'>{formatKRW(row.original.price)}원</span>
            <div className='flex items-center justify-center border border-lightgray rounded-md mx-1'>
              <button className='px-2 py-1 md:px-3'>-</button>
              <span className='px-2 py-1 md:px-3'>{row.original.quantity}</span>
              <button className='px-2 py-1 md:px-3'>+</button>
            </div>
          </>
        );
      },
      className:
        'w-full h-full py-3 border-t border-b border-lightgray flex-col flex items-center justify-center sm:py-0 sm:w-1/5 sm:border-l sm:border-t-0 sm:border-b-0 sm:border-r',
    },
    {
      accessorKey: 'total-price',
      header: () => <span className='sr-only'>합계금액</span>,
      cell: ({ row }) =>
        `${getSumPrice(row.original.quantity, row.original.price)}원`,
      className:
        'w-full py-3 text-center font-bold sm:py-0 sm:w-1/5 sm:text-[16px]',
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={cartBookList}
      classNames={{
        table:
          'w-full overflow-x-auto mb-24 sm:border-t sm:border-b sm:border-lightgray',
        bodyRow:
          'flex flex-row flex-wrap border border-lightgray mb-2 h-auto sm:mb-0 sm:border-0 sm:items-center sm:h-36 sm:border-b',
        headRow: 'sr-only',
      }}
    />
  );
}
