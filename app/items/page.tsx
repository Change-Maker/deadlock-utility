import {
  VitalityItemDataTable,
  WeaponItemDataTable,
} from '@/components/data-table';

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
          bg-weapon/10
          outline
          outline-1
          outline-weapon
          outline-offset-2
        `}
      >
        <WeaponItemDataTable />
      </div>
      <div
        className={`
          container
          rounded-md
          p-4
          mb-5
          min-w-fit
          bg-vitality/10
          outline
          outline-1
          outline-vitality
          outline-offset-2
        `}
      >
        <VitalityItemDataTable />
      </div>
    </div>
  );
}
