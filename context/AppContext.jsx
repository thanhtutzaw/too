import React, { createContext, useState } from "react";
import useSelect from "../hooks/useSelect";
export const AppContext = createContext(null);
export default function AppProvider({ children, notes }) {
  const [Search, setSearch] = useState();
  const [showAction, setShowAction] = useState();
  const [isSearching, setisSearching] = useState(false);
  const { allItems, selectLength, selectedId, setselectedId, clearSelect } =
    useSelect(notes);
  return (
    <AppContext.Provider
      value={{
        // select,
        // setSelect,
        allItems,
        notes,
        isSearching,
        setisSearching,
        Search,
        setSearch,
        showAction,
        setShowAction,
        selectedId,
        setselectedId,
        selectLength,
        clearSelect,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
