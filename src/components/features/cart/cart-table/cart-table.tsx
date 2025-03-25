'use client';
import DataTable from '@/components/features/common/data-table';
import useCartStore from '@/store/cart/cart-store';
import { cartTableColumns } from './cart-table.columns';

export default function CartTable() {
  const { cartBooks } = useCartStore();

  return (
    <DataTable
      columns={cartTableColumns}
      data={cartBooks}
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
