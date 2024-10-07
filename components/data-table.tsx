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
    <div className="flex-row flex-nowrap flex justify-start items-center min-w-32">
      <Image
        className="brightness-0 saturate-100 invert mr-1"
        src={iconUrl}
        width={24}
        height={24}
        alt={`${name}_icon`}
      />
      <div>
        {name}
      </div>
    </div>
  );
}

function PriceJSX(price: number) {
  return (
    <div className="flex-row flex-nowrap flex justify-start items-center">
      <Image
        className="mr-1"
        src="https://deadlocked.wiki/images/thumb/e/e3/Souls_iconColored.png/13px-Souls_iconColored.png"
        height={10}
        width={10}
        alt="souls_icon"
      />
      <div>{price}</div>
    </div>
  );
}

const columnHelper = createColumnHelper<ItemData>();
const columns = [
  columnHelper.accessor('name', {
    id: 'price-name',
    header: 'Price&Name',
    cell: ({ cell, row }) => (
      <div className="flex-col flex-nowrap flex">
        {PriceJSX(row.original.price)}
        {NameJSX(row.original.icon, cell.getValue())}
      </div>
    ),
  }),
  columnHelper.accessor('descs', {
    id: 'descs',
    header: 'Description',
    cell: (info) => (
      info.getValue().map((desc) => (
        <div key={desc} className="min-w-32">{desc}</div>
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
        <div className="min-w-52 max-w-80">
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
                    <div className="whitespace-pre-line">{info.getValue().active?.desc}</div>
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
                    <div className="whitespace-pre-line">{info.getValue().passive?.desc}</div>
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
      <div className="flex-wrap flex gap-1 text-sm max-w-40">
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
          } else if (tagJson.negtiveEffectTags.includes(tag)) {
            style = 'bg-tag-negtive-effect';
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
    header: () => <div className="text-lg">Is Component Of</div>,
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
      <thead className="text-xl">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="p-2">
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
      <tbody className={`text-base border-t-2 ${borderColor}`}>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className={`border-t ${borderColor}`}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-3 py-5">
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
