'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';

type CustomColumnDef<T> = ColumnDef<T> & { className?: string };

type DataTableProps<T> = {
  columns: CustomColumnDef<T>[];
  data: T[];
  classNames?: {
    table?: string;
    headRow?: string;
    bodyRow?: string;
  };
};

export default function DataTable<T>({
  columns,
  data,
  classNames,
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className={classNames?.table}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className={classNames?.headRow}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className={classNames?.bodyRow}>
              {row.getVisibleCells().map((cell) => {
                const column = cell.column.columnDef as CustomColumnDef<T>;
                return (
                  <TableCell key={cell.id} className={column.className}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className='text-center font-bold'
            >
              데이터가 없습니다.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
