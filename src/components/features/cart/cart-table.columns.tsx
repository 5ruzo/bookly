import { TypeCartItem } from '@/types/cart.type';
import { ColumnDef } from '@tanstack/react-table';
import BookSummary from './book-summary';
import CartCheckBook from './cart-check-book';
import QuantityControl from './quantity-control';
import TotalPrice from './total-price';

type TypeCartTableColumns = ColumnDef<TypeCartItem> & { className?: string };

const styles = {
  checkboxField:
    'w-auto flex items-center justify-center self-stretch mx-2 sm:ml-0 sm:mr-4 sm:mt-0',
  priceQuantityField:
    'w-full h-full py-3 border-t border-b border-lightgray flex-col flex items-center justify-center sm:py-0 sm:w-1/5 sm:border-l sm:border-t-0 sm:border-b-0 sm:border-r',
  totalPriceField:
    'w-full py-3 text-center font-bold sm:py-0 sm:w-1/5 sm:text-[16px]',
};

export const cartTableColumns: TypeCartTableColumns[] = [
  {
    id: 'select',
    header: () => <span className='sr-only'>선택 여부</span>,
    cell: ({ row }) => <CartCheckBook id={row.original.id} />,
    className: styles.checkboxField,
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
    cell: ({ row }) => (
      <QuantityControl
        id={row.original.id}
        price={row.original.price}
        quantity={row.original.quantity}
      />
    ),
    className: styles.priceQuantityField,
  },
  {
    accessorKey: 'total-price',
    header: () => <span className='sr-only'>합계금액</span>,
    cell: ({ row }) => (
      <TotalPrice quantity={row.original.quantity} price={row.original.price} />
    ),
    className: styles.totalPriceField,
  },
];
