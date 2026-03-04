import React, { createContext, useContext, useState, useEffect } from 'react';

const GatheringContext = createContext();

const LOCAL_STORAGE_KEY = 'gatherings_data';

export const GatheringProvider = ({ children }) => {
  const [gatherings, setGatherings] = useState(() => {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error('Failed to parse collections from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gatherings));
    } catch (error) {
      console.error('Failed to save to localStorage', error);
    }
  }, [gatherings]);

  // Actions
  const addGathering = (newGathering) => {
    const gathering = {
      ...newGathering,
      id: Date.now().toString(),
      items: [], // { id, name, type: 'food' | 'drink', claimedBy: null }
    };
    setGatherings((prev) => [...prev, gathering]);
    return gathering.id;
  };

  const deleteGathering = (id) => {
    setGatherings((prev) => prev.filter((g) => g.id !== id));
  };

  const addItemToGathering = (gatheringId, item) => {
    setGatherings((prev) =>
      prev.map((gathering) => {
        if (gathering.id === gatheringId) {
          return {
            ...gathering,
            items: [
              ...gathering.items,
              { ...item, id: Date.now().toString(), claimedBy: null },
            ],
          };
        }
        return gathering;
      })
    );
  };

  const removeGatheringItem = (gatheringId, itemId) => {
    setGatherings((prev) =>
      prev.map((gathering) => {
        if (gathering.id === gatheringId) {
          return {
            ...gathering,
            items: gathering.items.filter((item) => item.id !== itemId),
          };
        }
        return gathering;
      })
    );
  };

  const claimItem = (gatheringId, itemId, claimerName) => {
    setGatherings((prev) =>
      prev.map((gathering) => {
        if (gathering.id === gatheringId) {
          return {
            ...gathering,
            items: gathering.items.map((item) =>
              item.id === itemId
                ? { ...item, claimedBy: claimerName }
                : item
            ),
          };
        }
        return gathering;
      })
    );
  };

  const unclaimItem = (gatheringId, itemId) => {
    setGatherings((prev) =>
      prev.map((gathering) => {
        if (gathering.id === gatheringId) {
          return {
            ...gathering,
            items: gathering.items.map((item) =>
              item.id === itemId ? { ...item, claimedBy: null } : item
            ),
          };
        }
        return gathering;
      })
    );
  };

  const getGatheringById = (id) => gatherings.find((g) => g.id === id);

  return (
    <GatheringContext.Provider
      value={{
        gatherings,
        addGathering,
        deleteGathering,
        addItemToGathering,
        removeGatheringItem,
        claimItem,
        unclaimItem,
        getGatheringById,
      }}
    >
      {children}
    </GatheringContext.Provider>
  );
};

export const useGatherings = () => {
  const context = useContext(GatheringContext);
  if (!context) {
    throw new Error('useGatherings must be used within a GatheringProvider');
  }
  return context;
};
