import { GetAllTierListResp } from "@/api/tierList/getAllTierList";
import formatNumber from "@/utils/formatNumberUtil";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

type TierItemData = {
  tierListId: string;
  tierListName: string;
  tierListType: string;
  itemCount: string;
  likeCount: string;
  ratingCount: string;
  commentCount: string;
  tierListThumbnailUrl: string;
};

interface TierListItemProps {
  item: TierItemData;
}

export default function TierListItem({ item }: TierListItemProps) {
    // const imageUrl = typeof item.thumbnail === 'string'
    // ? item.thumbnail
    // : URL.createObjectURL(item.thumbnail);

  return (
    <Link
      href={`/ViewTierListPage/${item.tierListId}`}
      className="card-gray-small-padding w-34 md:w-56 flex flex-col hover:brightness-90 transition-colors cursor-pointer"
    >
      <div className="relative w-full h-26 md:h-36 mb-2">
        <Image 
          src={item.tierListThumbnailUrl} 
          alt={`${item.tierListName} thumbnail`}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
        <div className="flex flex-col bg-[rgba(0,0,0,0.7)] absolute rounded-sm bottom-0 right-0 p-1 leading-tight">
          <div className="flex flex-row items-center">
            <p className="text-sub-white mr-auto">{formatNumber(item.itemCount)}</p>
            <img alt="item count" src="/icons/ic_item.webp" className="h-3 w-3 ml-1"/>
          </div>
          <div className="flex flex-row items-center">
            <p className="text-sub-white mr-auto">{formatNumber(item.likeCount)}</p>
            <FaHeart className="h-3 w-3 text-white ml-1" />
            {/* <img alt="rating count" src="/icons/ic_heart.webp" className="h-3 w-3 ml-1"/> */}
          </div>
          <div className="flex flex-row items-center">
            <p className="text-sub-white mr-auto">{formatNumber(item.ratingCount)}</p>
            <img alt="rating count" src="/icons/ic_rating.webp" className="h-3 w-3 ml-1"/>
          </div>
          <div className="flex flex-row items-center">
            <p className="text-sub-white mr-auto">{formatNumber(item.commentCount)}</p>
            <img alt="comment count" src="/icons/ic_comment.webp" className="h-3 w-3 ml-1"/>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="text-header2-white mb-1 truncate">{item.tierListName}</h3>
        <p className="text-sub-white">Type: {item.tierListType}</p>
      </div>
    </Link>
  );
}