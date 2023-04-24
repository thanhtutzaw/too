import React, { createContext, useState } from "react";
import useSelect from "../hooks/useSelect";
export const AppContext = createContext(null);
export default function AppProvider({ children }) {
  const { selectLength, selectedId, setselectedId, clearSelect } = useSelect();
  const [showAction, setShowAction] = useState();
  const [Search, setSearch] = useState();
  const [isSearching, setisSearching] = useState(false);
  return (
    <AppContext.Provider
      value={{
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
