interface ActivePassive {
  cooldown?: number | null;
  desc: string;
  additionalDescs: string[];
}

export interface ItemData {
  name: string;
  icon: string;
  price: number;
  component?: string | null;
  isComponentOf?: string | null;
  descs: string[];
  active?: ActivePassive | null;
  passive?: ActivePassive | null;
  tags: string[];
}

export interface ItemJson {
  $schema: string;
  patch: string;
  category: string;
  color: string;
  items: ItemData[];
}
