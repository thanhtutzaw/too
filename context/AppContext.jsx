import React, { createContext, useState } from "react";
import useSelect from "../hooks/useSelect";
export const AppContext = createContext(null);
export default function AppProvider({ children }) {
  const { selectedId, setselectedId } = useSelect();
  const [showAction, setShowAction] = useState();
  const selectLength = selectedId.length;
  const clearSelect = () => {
    setselectedId([]);
  };
  return (
    <AppContext.Provider
      value={{
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
