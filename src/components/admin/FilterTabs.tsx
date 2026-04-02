import React from 'react';

type FilterType = 'all' | 'active' | 'expired';

interface FilterTabsProps {
  currentFilter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ currentFilter, setFilter }) => {
  const tabs: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All Coupons' },
    { id: 'active', label: 'Active Only' },
    { id: 'expired', label: 'Expired' },
  ];

  return (
    <div className="flex gap-2 mb-6 p-1 bg-white inline-flex rounded-xl shadow-sm border border-gray-200">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setFilter(tab.id)}
          className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
            currentFilter === tab.id
              ? 'bg-[#3c2f2f] text-[#fff4e6] shadow-md'
              : 'text-gray-500 hover:text-[#3c2f2f] hover:bg-gray-50'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};