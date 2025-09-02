export interface Item {
  itemId: string;
  itemName: string;
  tierList: string;
  category?: string;
  itemPhoto: string;
  tier: string;
  averageRating: string;
  ratingCount: string;
}

export interface Tier {
  name: string;
  colorClass: string;
}

export interface TierListProps {
  items: Item[];
  selectedItem: Item | null;
  handleItemClick: (item: Item) => void;
}