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
    <div className="flex gap-1.5 mb-5 p-1.5 rounded-2xl w-fit"
         style={{ background: '#e2e8f0' }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setFilter(tab.id)}
          className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
          style={
            currentFilter === tab.id
              ? {
                  background: '#c0392b',
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(192,57,43,0.3)',
                }
              : {
                  background: 'transparent',
                  color: '#64748b',
                }
          }
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
