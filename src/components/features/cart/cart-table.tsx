'use client';
import DataTable from '@/components/features/common/data-table';
import { Checkbox } from '@/components/ui/checkbox';
import { formatKRW } from '@/lib/utils/cart/formatKRW';
import '@/styles/cart/cart.css';
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
      className: 'cart-checkbox',
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
            <div className='quantity-control-box'>
              <button className='quantity-control'>-</button>
              <span className='quantity-control'>{row.original.quantity}</span>
              <button className='quantity-control'>+</button>
            </div>
          </>
        );
      },
      className: 'cart-price-quantity',
    },
    {
      accessorKey: 'total-price',
      header: () => <span className='sr-only'>합계금액</span>,
      cell: ({ row }) =>
        `${getSumPrice(row.original.quantity, row.original.price)}원`,
      className: 'cart-total',
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={cartBookList}
      classNames={{
        table: 'cart-table',
        bodyRow: 'cart-item',
        headRow: 'sr-only',
      }}
    />
  );
}
