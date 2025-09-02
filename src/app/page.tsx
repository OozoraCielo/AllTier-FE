import Image from "next/image";
import TierListsComponent from "./tierLists";

export default function HomePage() {



  return (
    <div className="h-full w-full px-5 lg:px-15">
      <p className="text-header-white text-center">Tier Lists Made By All</p>
      <TierListsComponent/>

    </div>
  );
}
