import React from 'react';
import { Tier, TierListProps, Item } from '@/types';

const tierConfig: Tier[] = [
  { name: 'S', colorClass: 'red-tier' },
  { name: 'A', colorClass: 'orange-tier' },
  { name: 'B', colorClass: 'yellow-tier' },
  { name: 'C', colorClass: 'green-tier' },
  { name: 'D', colorClass: 'blue-tier' },
  { name: 'E', colorClass: 'blue2-tier' },
  { name: 'F', colorClass: 'purple-tier' },
];

const ViewTierListAll: React.FC<TierListProps> = ({ items, selectedItem, handleItemClick }) => {
  return (
    <div className="card-gray-big-padding w-full grow min-h-36 flex flex-col mt-4 flex-wrap gap-4">
      {tierConfig.map((tier, index) => (
        <React.Fragment key={tier.name}>
          <div className="flex flex-col lg:flex-row">
            <div className={`min-h-16 lg:min-h-24 lg:h-fill w-fill lg:w-24  ${tier.colorClass} rounded-lg flex flex-col items-center justify-center text-header-white shrink-0`}>
              {tier.name}
            </div>
            <div className="flex flex-row gap-4 ml-0 lg:ml-4 mt-4 lg:mt-0  flex-wrap justify-center lg:justify-start">
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

export default ViewTierListAll;