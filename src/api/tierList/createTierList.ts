export interface CreateNewTierListParam {
  tierListName: string;
  tierListType: string;
  thumbnailUrl: string;
  categories: string[];
  items: Item[];
}

interface Item{
    itemName: string;
    category: string | null;
    thumbnailUrl: string;
}