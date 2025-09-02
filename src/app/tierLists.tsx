import TierListItem from "./tierListItem"; // Adjust the import path as needed

export default function TierListsComponent() {

  const tierListData = [
    {
      id: 1,
      name: "Wuwa Meta",
      type: "Rating",
      itemCount: "150",
      likeCount: "2000",
      ratingCount: "1000",
      commentCount: "100",
      thumbnail: "/wuwa.jpg",
      creator: "Juan dela Cruz",
      created_at: "1/1/2020",
      updated_at: "8/20/2025",
    },
    {
      id: 2,
      name: "Wuwa Meta",
      type: "Rating",
      itemCount: "150",
      likeCount: "2000",
      ratingCount: "1000",
      commentCount: "100",
      thumbnail: "/wuwa.jpg",
      creator: "Juan dela Cruz",
      created_at: "1/1/2020",
      updated_at: "8/20/2025",
    },
{
      id: 3,
      name: "Wuwa Meta",
      type: "Rating",
      itemCount: "150",
      likeCount: "2000",
      ratingCount: "1000",
      commentCount: "100",
      thumbnail: "/wuwa.jpg",
      creator: "Juan dela Cruz",
      created_at: "1/1/2020",
      updated_at: "8/20/2025",
    },{
      id: 4,
      name: "Wuwa Meta",
      type: "Rating",
      itemCount: "150",
      likeCount: "2000",
      ratingCount: "1000",
      commentCount: "100",
      thumbnail: "/wuwa.jpg",
      creator: "Juan dela Cruz",
      created_at: "1/1/2020",
      updated_at: "8/20/2025",
    },{
      id: 5,
      name: "Wuwa Meta",
      type: "Rating",
      itemCount: "150",
      likeCount: "2000",
      ratingCount: "1000",
      commentCount: "100",
      thumbnail: "/wuwa.jpg",
      creator: "Juan dela Cruz",
      created_at: "1/1/2020",
      updated_at: "8/20/2025",
    },{
      id: 6,
      name: "Wuwa Meta",
      type: "Rating",
      itemCount: "150",
      likeCount: "2000",
      ratingCount: "1000",
      commentCount: "100",
      thumbnail: "/wuwa.jpg",
      creator: "Juan dela Cruz",
      created_at: "1/1/2020",
      updated_at: "8/20/2025",
    },{
      id: 7,
      name: "Wuwa Meta",
      type: "Rating",
      itemCount: "150",
      likeCount: "2000",
      ratingCount: "1000",
      commentCount: "100",
      thumbnail: "/wuwa.jpg",
      creator: "Juan dela Cruz",
      created_at: "1/1/2020",
      updated_at: "8/20/2025",
    },  ];

  return (
    <div className="h-full w-full flex flex-row flex-wrap gap-3 md:gap-6 mt-4 justify-center">
      {tierListData.map((item) => (
        <TierListItem key={item.id} item={item} />
      ))}
    </div>
  );
}