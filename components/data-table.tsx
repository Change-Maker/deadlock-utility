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

import tagJson from '@/data/tag.json';
import weaponItemJson from '@/data/weapon-item.json';
import { ItemData } from '@/types/item-type';

function NameJSX(iconUrl: string, name: string) {
  return (
    <div className="flex-row flex-nowrap flex justify-start items-center h-10">
      <Image
        className="brightness-100 saturate-100 h-6 mr-1"
        src={iconUrl}
        width={24}
        height={24}
        alt={`${name}_icon`}
      />
      <div className="h-8">
        {name}
      </div>
    </div>
  );
}

const columnHelper = createColumnHelper<ItemData>();
const columns = [
  columnHelper.accessor('price', {
    id: 'price',
    header: 'Price',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    id: 'name',
    header: 'Name',
    cell: ({ cell, row }) => NameJSX(row.original.icon, cell.getValue()),
  }),
  columnHelper.accessor('descs', {
    id: 'descs',
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
      id: 'active-passive',
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
  columnHelper.accessor('tags', {
    id: 'tags',
    header: 'Tags',
    cell: (info) => (
      <div className="flex-wrap flex gap-1 text-sm max-w-52">
        {info.getValue().map((tag) => {
          let style = 'bg-slate-500';
          if (tagJson.weaponTags.includes(tag)) {
            style = 'bg-weapon';
          } else if (tagJson.vitalityTags.includes(tag)) {
            style = 'bg-vitality';
          } else if (tagJson.spiritTags.includes(tag)) {
            style = 'bg-spirit';
          } else if (tagJson.otherTags.includes(tag)) {
            style = 'bg-tag-other';
          } else if (tagJson.applyToEnemyTags.includes(tag)) {
            style = 'bg-tag-apply-to-enemy';
          }
          return (
            <div
              key={tag}
              className={`
                ${style}
                px-1
                text-background
                rounded-md
              `}
            >
              {tag}
            </div>
          );
        })}
      </div>
    ),
  }),
  columnHelper.accessor('component', {
    id: 'component',
    header: 'Component',
    cell: (info) => {
      const target = weaponItemJson.items.find((item) => item.name === info.getValue());
      if (target) {
        return NameJSX(target.icon, target.name);
      }
      return null;
    },
  }),
  columnHelper.accessor('isComponentOf', {
    id: 'is-component-of',
    header: () => <div className="text-xl">Is Component Of</div>,
    cell: (info) => {
      const target = weaponItemJson.items.find((item) => item.name === info.getValue());
      if (target) {
        return NameJSX(target.icon, target.name);
      }
      return null;
    },
  }),
];

function ItemDataTable(
  { table, borderColor }: Readonly<{ table: Table<ItemData>, borderColor: string }>,
) {
  return (
    <table className="mx-auto">
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
    <ItemDataTable table={table} borderColor="border-weapon/50" />
  );
}

export function VitalityItemDataTable() {

}

export function SpiritItemDataTable() {

}
