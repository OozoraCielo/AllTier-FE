export interface CreateNewTierListParam {
  tierListName: string;
  tierListType: string;
  tierListThumbnail: File;
  categories: string[];
  items: Item[];
}

interface Item{
    itemName: string;
    category: string | null;
    itemImage: File;
}