"use client";

import { useState, useEffect } from "react";
import TierListItem from "./tierListItem";
import { api } from "@/api/apiClient"; // Make sure this path is correct
import { GetAllTierListResp } from "@/api/tierList/getAllTierList";
import Loading from "./loading";

export default function HomePage() {
  const [tierLists, setTierLists] = useState<GetAllTierListResp[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function fetchTierLists() {
          try {
            setIsLoading(true);
            const data = await api.getAllTierList();
            console.log(data);
            setTierLists(data);
            setError(null);
          } catch (err) {
            setError("Failed to fetch tier lists. Please try again later.");
            console.error(err);
          } finally {
            setIsLoading(false);
          }
        }
    
        fetchTierLists();
      }, []); // The empty array [] means this effect runs only once
    
      // 4. Handle loading and error states in your JSX
      if (isLoading) {
        return <Loading/>;
      }
    
      if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
      }


  return (
    <div className="h-full w-full px-1 lg:px-15">
      <p className="text-header-white text-center">Tier Lists Made By All</p>
      {/* <TierListsComponent/> */}
      <div className="h-full w-full flex flex-row flex-wrap gap-3 md:gap-6 mt-4 justify-center">
            {tierLists.map((item) => (
              <TierListItem key={item.tierListId} item={item} />
            ))}
          </div>

    </div>
  );
}
