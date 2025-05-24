"use client"

import React, { createContext, useContext, useState } from "react";

interface SearchContextType {
  searchTimestamp: number;
  updateSearchTimestamp: () => void;
}

const SearchContext = createContext<SearchContextType>({
  searchTimestamp: 0,
  updateSearchTimestamp: () => {},
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchTimestamp, setSearchTimestamp] = useState<number>(Date.now());

  const updateSearchTimestamp = () => {
    setSearchTimestamp(Date.now());
  };

  return (
    <SearchContext.Provider value={{ searchTimestamp, updateSearchTimestamp }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
