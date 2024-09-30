'use client';

import {
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  useReactTable,
  Table,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import Image from 'next/image';

import weaponItemJson from '@/data/weapon-item.json';
import { ItemData } from '@/types/item-type';

const columnHelper = createColumnHelper<ItemData>();
const columns = [
  columnHelper.accessor('price', {
    header: 'Price',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: ({ cell, row }) => (
      <div className="flex-row flex-nowrap flex justify-start items-center h-10">
        <Image
          className="brightness-100 saturate-100 h-6 mr-1"
          src={row.original.icon}
          width={24}
          height={24}
          alt={`${cell.getValue()}_icon`}
        />
        <div className="h-8">
          {cell.getValue()}
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('descs', {
    header: 'Description',
    cell: (info) => (
      info.getValue().map((desc) => (
        <div key={desc} className="text-lg">{desc}</div>
      ))
    ),
  }),
  columnHelper.accessor(
    (row) => (
      {
        active: row.active,
        passive: row.passive,
      }
    ),
    {
      header: 'Active/Passive',
      cell: (info) => (
        <div className="text-base max-w-96">
          {
            info.getValue().active
              ? (
                <div className="mb-2">
                  <div>
                    <span className="text-sky-500 font-bold">Active</span>
                    {
                      info.getValue().active?.cooldown
                        ? (` (CD: ${info.getValue().active?.cooldown}s)`)
                        : null
                    }
                  </div>
                  <div className="pl-2">
                    <div>{info.getValue().active?.desc}</div>
                    {info.getValue().active?.additionalDescs.map((desc) => (
                      <div key={desc}>{desc}</div>
                    ))}
                  </div>
                </div>
              )
              : null
          }
          {
            info.getValue().passive
              ? (
                <div>
                  <div>
                    <span className="font-bold">Passive</span>
                    {
                      info.getValue().passive?.cooldown
                        ? (` (CD: ${info.getValue().passive?.cooldown}s)`)
                        : null
                    }
                  </div>
                  <div className="pl-2">
                    <div>{info.getValue().passive?.desc}</div>
                    {info.getValue().passive?.additionalDescs.map((desc) => (
                      <div key={desc}>{desc}</div>
                    ))}
                  </div>
                </div>
              )
              : null
          }
        </div>
      ),
    },
  ),
];

function ItemDataTable(
  { table, borderColor }: Readonly<{ table: Table<ItemData>, borderColor: string }>,
) {
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="text-2xl py-2">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className={`border-t-2 ${borderColor}`}>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className={`border-t ${borderColor}`}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="text-xl px-3 py-2">
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext(),
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function WeaponItemDataTable() {
  const data = useMemo(() => weaponItemJson.items, []);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <ItemDataTable table={table} borderColor="border-amber-500/50" />
  );
}

export function VitalityItemDataTable() {

}

export function SpiritItemDataTable() {

}
