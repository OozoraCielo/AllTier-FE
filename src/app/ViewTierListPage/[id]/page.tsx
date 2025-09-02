"use client";
import React from "react";
import { ChangeEvent, useState } from "react";

interface Item {
  itemId: string;
  itemName: string;
  tierList: string;
  category?: string;
  itemPhoto: string;
  tier: string;
  averageRating: string;
  ratingCount: string;
}

interface Tier {
  name: string;
  colorClass: string;
}

interface TierListProps {
  items: Item[];
  selectedItem: Item | null;
  handleItemClick: (item: Item) => void;
}

export default function TierListRatingPage() {
  const tierList = {
    tierListId: "1",
    tierListName: "Testing Tier List",
    tierListType: "Rating",
    user: null,
    itemCount: "4",
    likeCount: "2000",
    ratingCount: "1500",
    commentCount: "200",
    createdAt: Date.now,
    updatedAt: Date.now,
    thumbnail: "/wuwa.jpg",
    categories: ["Dps", "Sub-Dps", "Support"],
  };

  const items = [
    {
      itemId: "1",
      itemName: "test1",
      tierList: "1",
      category: "Dps",
      itemPhoto: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "2",
      itemName: "test2",
      tierList: "1",
      category: "Support",
      itemPhoto: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.25",
      ratingCount: "5000",
    },
    {
      itemId: "3",
      itemName: "test3",
      tierList: "1",
      category: "Sub-Dps",
      itemPhoto: "/wuwa.jpg",
      tier: "A",
      averageRating: "8.91",
      ratingCount: "5000",
    },
    {
      itemId: "4",
      itemName: "test4",
      tierList: "1",
      category: "Dps",
      itemPhoto: "/wuwa.jpg",
      tier: "C",
      averageRating: "5.91",
      ratingCount: "1000",
    },
    {
      itemId: "5",
      itemName: "test5",
      tierList: "1",
      category: "Dps",
      itemPhoto: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "6",
      itemName: "test6",
      tierList: "1",
      category: "Dps",
      itemPhoto: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "7",
      itemName: "test7",
      tierList: "1",
      category: "Dps",
      itemPhoto: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "8",
      itemName: "test8",
      tierList: "1",
      category: "Dps",
      itemPhoto: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "9",
      itemName: "test9",
      tierList: "1",
      category: "Dps",
      itemPhoto: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "10",
      itemName: "test10",
      tierList: "1",
      category: "Dps",
      itemPhoto: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "11",
      itemName: "test11",
      tierList: "1",
      category: "Dps",
      itemPhoto: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "12",
      itemName: "test12",
      tierList: "1",
      category: "Dps",
      itemPhoto: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "13",
      itemName: "test13",
      tierList: "1",
      category: "Dps",
      itemPhoto: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "14",
      itemName: "test14",
      tierList: "1",
      category: "Dps",
      itemPhoto: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "15",
      itemName: "test15",
      tierList: "1",
      category: "Dps",
      itemPhoto: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
  ];

  const tierConfig: Tier[] = [
  { name: 'S', colorClass: 'red-tier' },
  { name: 'A', colorClass: 'orange-tier' },
  { name: 'B', colorClass: 'yellow-tier' },
  { name: 'C', colorClass: 'green-tier' },
  { name: 'D', colorClass: 'blue-tier' },
  { name: 'E', colorClass: 'blue2-tier' },
  { name: 'F', colorClass: 'purple-tier' },
];

const TierList: React.FC<TierListProps> = ({ items, selectedItem, handleItemClick }) => {
  return (
    <div className="card-gray-big-padding w-full grow min-h-36 flex flex-col mt-4 flex-wrap gap-4">
      {tierConfig.map((tier, index) => (
        <React.Fragment key={tier.name}>
          <div className="flex flex-row">
            <div className={`min-h-24 h-fill w-24 ${tier.colorClass} rounded-lg flex flex-col items-center justify-center text-header-white shrink-0`}>
              {tier.name}
            </div>
            <div className="flex flex-row gap-4 ml-4 flex-wrap">
              {items
                .filter(item => item.tier === tier.name)
                .map((item) => (
                  <img
                    key={item.itemId}
                    src={item.itemPhoto}
                    alt={item.itemName || "Uploaded item"}
                    onClick={() => handleItemClick(item)}
                    className={`h-24 w-24 object-cover rounded-lg cursor-pointer hover:brightness-90 transition-all border-2 ${
                      selectedItem?.itemId === item.itemId
                        ? "border-white"
                        : "border-transparent"
                    }`}
                  />
                ))}
            </div>
          </div>
          {index < tierConfig.length - 1 && (
            <div className="h-0.5 bg-gray-500"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const [isChecked, setIsChecked] = useState(false);

  // 2. Define a handler to toggle the state
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    // event.target.checked is now safely typed as a boolean
    setIsChecked(event.target.checked);
  };

  function handleItemClick(item: Item) {
    if (selectedItem?.itemId == item.itemId) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  }

  return (
    <div className="h-full w-full px-5 lg:px-15">
      <p className="text-header-white text-center">{tierList.tierListName}</p>
      <div className="flex flex-row gap-4 mt-4">
        <button className="button-gray-disabled">View Tier List</button>
        <button className="button-gray">Give Rating</button>
        <div className="button-like-gray flex flex-row items-center justify-center gap-x-2">
          <p>By Category</p>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:justify-center md:items-start">
        {/* Tier List Box All */}
          {/* S Tier */}
          {/* <div className="flex flex-row">
            <div className="min-h-24 h-fill w-24 red-tier rounded-lg flex flex-col items-center justify-center text-header-white shrink-0">
              S
            </div>
            <div className="flex flex-row gap-4 ml-4 flex-wrap">
              {items.filter(item => item.tier === "S").map((item) => (
                <img
                  key={item.itemId}
                  src={item.itemPhoto}
                  alt={item.itemName || "Uploaded item"}
                  onClick={() => handleItemClick(item)}
                  className={`h-24 w-24 object-cover rounded-lg cursor-pointer hover:brightness-90 transition-all border-2 ${
                    selectedItem?.itemId === item.itemId
                      ? "border-white"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="h-0.5 bg-gray-500"></div> */}

          {/* A Tier */}
          {/* <div className="flex flex-row">
            <div className="min-h-24 h-fill w-24 orange-tier rounded-lg flex flex-col items-center justify-center text-header-white shrink-0">
              A
            </div>
            <div className="flex flex-row gap-4 ml-4 flex-wrap">
              {items.filter(item => item.tier === "A").map((item) => (
                <img
                  key={item.itemId}
                  src={item.itemPhoto}
                  alt={item.itemName || "Uploaded item"}
                  onClick={() => handleItemClick(item)}
                  className={`h-24 w-24 object-cover rounded-lg cursor-pointer hover:brightness-90 transition-all border-2 ${
                    selectedItem?.itemId === item.itemId
                      ? "border-white"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="h-0.5 bg-gray-500"></div> */}

          {/* B Tier */}
          {/* <div className="flex flex-row">
            <div className="min-h-24 h-fill w-24 yellow-tier rounded-lg flex flex-col items-center justify-center text-header-white shrink-0">
              B
            </div>
            <div className="flex flex-row gap-4 ml-4 flex-wrap">
              {items.filter(item => item.tier === "B").map((item) => (
                <img
                  key={item.itemId}
                  src={item.itemPhoto}
                  alt={item.itemName || "Uploaded item"}
                  onClick={() => handleItemClick(item)}
                  className={`h-24 w-24 object-cover rounded-lg cursor-pointer hover:brightness-90 transition-all border-2 ${
                    selectedItem?.itemId === item.itemId
                      ? "border-white"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="h-0.5 bg-gray-500"></div> */}

          {/* C Tier */}
          {/* <div className="flex flex-row">
            <div className="h-fill w-24 green-tier rounded-lg flex flex-col items-center justify-center text-header-white shrink-0">
              C
            </div>
            <div className="flex flex-row gap-4 ml-4 flex-wrap">
              {items.filter(item => item.tier === "C").map((item) => (
                <img
                  key={item.itemId}
                  src={item.itemPhoto}
                  alt={item.itemName || "Uploaded item"}
                  onClick={() => handleItemClick(item)}
                  className={`h-24 w-24 object-cover rounded-lg cursor-pointer hover:brightness-90 transition-all border-2 ${
                    selectedItem?.itemId === item.itemId
                      ? "border-white"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="h-0.5 bg-gray-500"></div> */}

          {/* D Tier */}
          {/* <div className="flex flex-row">
            <div className="min-h-24 h-fill w-24 blue-tier rounded-lg flex flex-col items-center justify-center text-header-white shrink-0">
              D
            </div>
            <div className="flex flex-row gap-4 ml-4 flex-wrap">
              {items.filter(item => item.tier === "D").map((item) => (
                <img
                  key={item.itemId}
                  src={item.itemPhoto}
                  alt={item.itemName || "Uploaded item"}
                  onClick={() => handleItemClick(item)}
                  className={`h-24 w-24 object-cover rounded-lg cursor-pointer hover:brightness-90 transition-all border-2 ${
                    selectedItem?.itemId === item.itemId
                      ? "border-white"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="h-0.5 bg-gray-500"></div> */}

          {/* E Tier */}
          {/* <div className="flex flex-row">
            <div className="min-h-24 h-fill w-24 blue2-tier rounded-lg flex flex-col items-center justify-center text-header-white shrink-0">
              E
            </div>
            <div className="flex flex-row gap-4 ml-4 flex-wrap">
              {items.filter(item => item.tier === "E").map((item) => (
                <img
                  key={item.itemId}
                  src={item.itemPhoto}
                  alt={item.itemName || "Uploaded item"}
                  onClick={() => handleItemClick(item)}
                  className={`h-24 w-24 object-cover rounded-lg cursor-pointer hover:brightness-90 transition-all border-2 ${
                    selectedItem?.itemId === item.itemId
                      ? "border-white"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="h-0.5 bg-gray-500"></div> */}

          {/* F Tier */}
          {/* <div className="flex flex-row">
            <div className="min-h-24 h-fill w-24 purple-tier rounded-lg flex flex-col items-center justify-center text-header-white shrink-0">
              F
            </div>
            <div className="flex flex-row gap-4 ml-4 flex-wrap">
              {items.filter(item => item.tier === "F").map((item) => (
                <img
                  key={item.itemId}
                  src={item.itemPhoto}
                  alt={item.itemName || "Uploaded item"}
                  onClick={() => handleItemClick(item)}
                  className={`h-24 w-24 object-cover rounded-lg cursor-pointer hover:brightness-90 transition-all border-2 ${
                    selectedItem?.itemId === item.itemId
                      ? "border-white"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div> */}

          <TierList
    items={items}
    selectedItem={selectedItem}
    handleItemClick={handleItemClick}
  />

        {/* Item Feedback */}
        <div className="card-gray-big-padding mt-4 h-auto w-92 ml-0 md:ml-4 shrink-0">
          <p className="text-normal-white text-center items-center">
            Click an item to view its feedback
          </p>
        </div>
      </div>
    </div>
  );
}
