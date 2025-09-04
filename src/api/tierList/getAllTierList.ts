import { User } from "@/types";

export interface GetAllTierListResp {
    tierListId: string;
  tierListName: string;
  tierListType: string;
  user: User;
  itemCount: string;
  likeCount: string;
  ratingCount: string;
  commentCount: string;
  tierListThumbnailUrl: string;
  categories?: string[];


}