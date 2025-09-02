"use client";

import { useRef, useState } from "react";
import TierListItem from "../tierListItem";
import Image from "next/image";
import { CreateNewTierListParam } from "@/api/tierList/createTierList";
import { api } from "@/api/apiClient";

export async function uploadFile(file: File): Promise<string> {
  console.log(`Using placeholder for ${file.name}.`);
  return Promise.resolve('/wuwa.jpg');
}

interface Item {
  id: number;
  image: File;
  name: string;
  category?: string;
}

export default function CreateNewTierListPage() {
  const [tierListName, setTierListName] = useState("Tier List Name");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [tierListType, setTierListType] = useState("Rating");
  const [categoryInput, setCategoryInput] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [validationErrors, setValidationErrors] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextId = useRef(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsInputRef = useRef<HTMLInputElement>(null);

  function uploadThumbnail() {
    fileInputRef.current?.click();
  }

  function uploadItemImages() {
    itemsInputRef.current?.click();
  }

  function handleThumbnailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnail(file);
    }
  }

  function handleItemsFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) return;

    const newItems: Item[] = Array.from(files).map((file) => {
      const newItem: Item = {
        id: nextId.current++,
        image: file,
        name: "",
      };
      if (tierListType === "Rating") {
        newItem.category = "";
      }
      return newItem;
    });

    setItems((prevItems) => [...prevItems, ...newItems]);
  }

  function handleItemUpdate(
    id: number,
    field: "name" | "category",
    value: string
  ) {
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem((prevItem) => ({
        ...prevItem!,
        [field]: value,
      }));
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }

  function handleItemClick(item: Item) {
    if (selectedItem?.id == item.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  }

  function handleNextItem() {
    if (!selectedItem || items.length < 2) return;

    const currentIndex = items.findIndex((item) => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % items.length; 
    setSelectedItem(items[nextIndex]);
  }

  function handlePrevItem() {
    if (!selectedItem || items.length < 2) return;

    const currentIndex = items.findIndex((item) => item.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setSelectedItem(items[prevIndex]);
  }

  function handleDeleteItem() {
    if (!selectedItem) return;

    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== selectedItem.id)
    );

    setSelectedItem(null);
  }

  async function handleSubmit() {
    setSelectedItem(null);
    const errors: number[] = [];
    items.forEach((item) => {
      if (!item.name.trim()) errors.push(item.id);
    });
    setValidationErrors(errors);

    if (!thumbnail) {
        alert("Please upload a thumbnail for the tier list.");
        return;
    }
    if (items.length === 0) {
        alert("Please upload at least one item.");
        return;
    }
    if (errors.length > 0) {
        alert("Please fill in the names for all items before saving.");
        return;
    }

    setIsSubmitting(true);
    try {
      const thumbnailUrlPromise = uploadFile(thumbnail);
      const itemImagePromises = items.map(item => uploadFile(item.image));
      
      const [uploadedThumbnailUrl, ...uploadedItemImageUrls] = await Promise.all([
        thumbnailUrlPromise, 
        ...itemImagePromises
      ]);
      
      const categories = categoryInput.split(",").map(cat => cat.trim()).filter(Boolean);
      
      const params: CreateNewTierListParam = {
        tierListName,
        tierListType,
        // thumbnailUrl: uploadedThumbnailUrl,
        thumbnailUrl: 'wuwa.jpg',
        categories,
        items: items.map((item, index) => ({
          itemName: item.name,
          category: item.category || null,
          thumbnailUrl: 'wuwa.jpg',
        })),
      };

      console.log("Sending data to backend:", params);
      await api.createNewTierList(params);

      alert("Tier list created successfully!");
      
    } catch (error) {
      console.error("Failed to create tier list:", error);
      alert("An error occurred while saving the tier list. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const categoryOptions = categoryInput
    .split(",")
    .map((cat) => cat.trim()) 
    .filter((cat) => cat);

  return (
    <div className="h-full w-full px-5 lg:px-15">
      <p className="text-header-white text-center">Create New Tier List</p>

      <div className="card-gray-big-padding mt-4">
        <p className="text-normal-white">How to create a new tier list?</p>
        <p className="text-normal-white">
          1. Enter the name of the tier list, upload an image that will become
          the thumbnail of the tier list, and select the type of tier list you
          want to create.
        </p>
        <p className="text-normal-white">
          2. If you selected the type: Rating, enter the categories of the tier
          list separated by a comma and a space: ", ". Example: "Dps, Sub-dps,
          Support". Leaving this blank means that the tier list will be created
          with no categories.
        </p>
        <p className="text-normal-white">
          3. Upload all the images of the items of the tier list (Images will
          automatically fit into a square)
        </p>
        <p className="text-normal-white">
          4. After uploading the images, they will automatically show up below.
          Fill up the information on the Info Box for each item
        </p>
        <p className="text-normal-white">
          5. After filling up the information for all items, click the Confirm
          Button to finalize the tier list. All items needs to have information
          to proceed to this step.
        </p>
      </div>

      <div className="flex flex-col mt-8 items-center">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Name..."
              className="p-2 focus:outline-none text-normal-black h-10 w-72 bg-white rounded-xl"
              onChange={(e) => setTierListName(e.target.value)}
            ></input>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleThumbnailChange}
              className="hidden"
              accept="image/*"
            />
            <button
              onClick={uploadThumbnail}
              className="button-gray mt-4 cursor-pointer"
            >
              Upload Thumbnail
            </button>
          </div>
          <div className="card-gray-small-padding ml-0 md:ml-4 mt-4 md:mt-0 w-72 md:w-56 h-22 md:h-24 text-normal-white">
            <p className="text-center">Tier List Type:</p>

            <div className="flex flex-row md:flex-col items-center mt-4 md:mt-2">
              <div className="flex ml-10 md:ml-0.5 ">
                <input
                  id="rating"
                  name="tierListType"
                  type="radio"
                  value="Rating"
                  className="h-4 w-4 cursor-pointer"
                  defaultChecked
                  onChange={(e) => {setTierListType(e.target.value)
                    setCategoryInput("")
                  }}
                />
                <label
                  htmlFor="rating"
                  className="ml-2 text-sm text-gray-200 cursor-pointer "
                >
                  Rating&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
              </div>

              <div className="flex">
                <input
                  id="tournament"
                  name="tierListType"
                  type="radio"
                  value="Tournament"
                  className="h-4 w-4 cursor-pointer"
                  onChange={(e) => {setTierListType(e.target.value)
                    setCategoryInput("")
                  }}
                />
                <label
                  htmlFor="tournament"
                  className="ml-2 text-sm text-gray-200 cursor-pointer"
                >
                  Tournament
                </label>
              </div>
            </div>
          </div>
        </div>
        {tierListType == "Rating" && (
          <textarea
            placeholder="Enter categories, separated by commas..."
            rows={4}
            className="p-2 focus:outline-none text-normal-black h-20 w-72 md:w-[530px] bg-white rounded-xl mt-4"
            onChange={(e) => setCategoryInput(e.target.value)}
          ></textarea>
        )}

        <div className="mt-4 pointer-events-none cursor-not-allowed">
          <TierListItem
            key={1}
            item={{
              id: 1,
              name: tierListName,
              type: tierListType,
              itemCount: "0",
              likeCount: "0",
              ratingCount: "0",
              commentCount: "0",
              thumbnail: thumbnail || "/wuwa.jpg",
            }}
          />
        </div>
      </div>

      <input
        type="file"
        ref={itemsInputRef}
        onChange={handleItemsFileChange}
        multiple
        accept="image/*"
        className="hidden"
      />
      <div className="flex w-full justify-center md:justify-start">
      <button
        className="button-gray mt-20"
        onClick={uploadItemImages}
      >
        Upload Item Images
      </button>
      </div>
      <div className="flex flex-col md:flex-row items-center md:justify-center md:items-start">
        <div className="card-gray-big-padding w-full grow min-h-36 flex items-center mt-4 flex-wrap gap-4">
          {items.map((item) => (
            <img
              key={item.id}
              src={URL.createObjectURL(item.image)}
              alt={item.name || "Uploaded item"}
              onClick={() => handleItemClick(item)}
              className={`h-24 w-24 object-cover rounded-lg cursor-pointer hover:brightness-90 transition-all border-2 ${
                
                  selectedItem?.id === item.id
                  ? "border-white"  
                  : validationErrors.includes(item.id)
                  ? "border-red-500" 
                  : "border-transparent" 
              } ${
                item?.name.trim() !== "" &&
                (item?.category || categoryInput.trim() === "") &&
                selectedItem?.id !== item.id
                  ? "brightness-50 border-transparent"
                  : "brightness-100"
              }`}
            />
          ))}
        </div>
        <div className="card-gray-big-padding mt-4 h-auto w-92 ml-0 md:ml-4 shrink-0">
          {selectedItem ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-full flex justify-between items-center mb-2">
                <p className="text-normal-white font-semibold">
                  Set Information
                </p>
                <p
                  onClick={handleDeleteItem}
                  className="text-red-500 font-bold text-xl cursor-pointer hover:brightness-80"
                >
                  X
                </p>
              </div>
              <Image
                src={URL.createObjectURL(selectedItem.image)}
                alt={selectedItem.name || "Selected item"}
                width={200}
                height={200}
                className="h-56 w-56 object-cover rounded-lg"
              />
              <input
                type="text"
                placeholder="Item Name"
                value={selectedItem.name}
                onChange={(e) =>
                  handleItemUpdate(selectedItem.id, "name", e.target.value)
                }
                className="p-2 focus:outline-none text-normal-black h-10 w-full bg-white rounded-xl"
              />
              {tierListType === "Rating" && categoryInput != "" && (
                <select
                  value={selectedItem.category}
                  onChange={(e) =>
                    handleItemUpdate(
                      selectedItem.id,
                      "category",
                      e.target.value
                    )
                  }
                  className="p-2 focus:outline-none text-normal-black h-10 w-full bg-white rounded-xl"
                >
                  <option value="" disabled>
                    -- Select a Category --
                  </option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              )}
              {items.length > 1 && (
                <div className="flex flex-row text-white text-4xl gap-8 select-none">
                  <p
                    onClick={handlePrevItem}
                    className="cursor-pointer hover:brightness-80"
                  >
                    &lt;
                  </p>
                  <p
                    onClick={handleNextItem}
                    className="cursor-pointer hover:brightness-80"
                  >
                    &gt;
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-normal-white text-center items-center">
              Click an image to edit its details
            </p>
          )}
        </div>
      </div>
      <div className="flex w-full mt-8 justify-center md:justify-end">
        <button className="button-blue" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Tier List'}
        </button>
      </div>
    </div>
  );
}