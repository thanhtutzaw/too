import React, { createContext, useState } from "react";
import useSelect from "../hooks/useSelect";
import useTheme from "../hooks/useTheme";
export const AppContext = createContext(null);
export default function AppProvider({ children, notes }) {
  const [Search, setSearch] = useState();
  const [showAction, setShowAction] = useState();
  const [isSearching, setisSearching] = useState(false);
  const [activeNote, setactiveNote] = useState("");
  const [active, setactive] = useState(false);
  const { theme, setTheme } = useTheme();
  const { allItems, selectLength, selectedId, setselectedId, clearSelect } =
    useSelect(notes);
  
  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        active,
        setactive,
        activeNote,
        setactiveNote,
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
