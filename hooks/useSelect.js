import { useState } from "react";

export default function useSelect() {
    const [selectedId, setselectedId] = useState([]);
    const selectLength = selectedId.length;
    const clearSelect = () => {
        setselectedId([]);
    };
    return { selectLength,selectedId, setselectedId, clearSelect }
}
