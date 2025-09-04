"use client";
import React from "react";
import { ChangeEvent, useState } from "react";

import { Item } from "@/types";
import ViewTierListAll from "@/app/ViewTierListPage/ViewTierListAll";

export default function ViewTierListRatingPage() {
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

  const items: Item[] = [
    {
      itemId: "1",
      itemName: "test1",
      tierList: "1",
      category: "Dps",
      itemImage: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "2",
      itemName: "test2",
      tierList: "1",
      category: "Support",
      itemImage: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.25",
      ratingCount: "5000",
    },
    {
      itemId: "3",
      itemName: "test3",
      tierList: "1",
      category: "Sub-Dps",
      itemImage: "/wuwa.jpg",
      tier: "A",
      averageRating: "8.91",
      ratingCount: "5000",
    },
    {
      itemId: "4",
      itemName: "test4",
      tierList: "1",
      category: "Dps",
      itemImage: "/wuwa.jpg",
      tier: "C",
      averageRating: "5.91",
      ratingCount: "1000",
    },
    {
      itemId: "5",
      itemName: "test5",
      tierList: "1",
      category: "Dps",
      itemImage: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "6",
      itemName: "test6",
      tierList: "1",
      category: "Dps",
      itemImage: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "7",
      itemName: "test7",
      tierList: "1",
      category: "Dps",
      itemImage: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "8",
      itemName: "test8",
      tierList: "1",
      category: "Dps",
      itemImage: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "9",
      itemName: "test9",
      tierList: "1",
      category: "Dps",
      itemImage: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "10",
      itemName: "test10",
      tierList: "1",
      category: "Dps",
      itemImage: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "11",
      itemName: "test11",
      tierList: "1",
      category: "Dps",
      itemImage: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "12",
      itemName: "test12",
      tierList: "1",
      category: "Dps",
      itemImage: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "13",
      itemName: "test13",
      tierList: "1",
      category: "Dps",
      itemImage: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "14",
      itemName: "test14",
      tierList: "1",
      category: "Dps",
      itemImage: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
    {
      itemId: "15",
      itemName: "test15",
      tierList: "1",
      category: "Dps",
      itemImage: "/wuwa.jpg",
      tier: "S",
      averageRating: "9.91",
      ratingCount: "5000",
    },
  ];

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    <div className="h-full w-full px-1 lg:px-15">
      <p className="text-header-white text-center">{tierList.tierListName}</p>
      <div className="flex flex-col md:flex-row gap-4 mt-4 items-center">
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
        <ViewTierListAll
          items={items}
          selectedItem={selectedItem}
          handleItemClick={handleItemClick}
        />

        <div className="card-gray-big-padding mt-4 h-auto w-72 md:w-92 ml-0 md:ml-4 shrink-0">
          {/* <p className="text-normal-white text-center items-center">
            Click an item to view its feedback
          </p> */}
          {selectedItem ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-full flex justify-between items-center mb-2">
                <p className="text-normal-white font-semibold">
                  Item Details
                </p>
              </div> 
              <div className="flex flex-row items-start gap-4">
                <img
                  src={selectedItem.itemImage}
                  alt={selectedItem.itemName || "Selected item"}
                  width={100}
                  height={100}
                  className="h-42 w-42 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-center my-auto">
                <p className="text-header3-white">{selectedItem.itemName}</p>
                <p className="text-normal-white">Tier: {selectedItem.tier}</p>
                <p className="text-normal-white">Category: {selectedItem.category}</p>
                <p className="text-normal-white">Average Rating: {selectedItem.averageRating}</p>
                <p className="text-normal-white">Rating Count: {selectedItem.ratingCount}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-normal-white text-center items-center">
              Click an image to view its details and feedbacks
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
