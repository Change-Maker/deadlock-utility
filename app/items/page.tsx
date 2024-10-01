import { WeaponItemDataTable } from '@/components/data-table';

export default function Items() {
  return (
    <div className="w-full">
      <div
        className={`
          container
          rounded-md
          p-4
          mb-5
          min-w-fit
          bg-amber-500/10
          outline
          outline-1
          outline-amber-500
          outline-offset-2
        `}
      >
        <WeaponItemDataTable />
      </div>
    </div>
  );
}
