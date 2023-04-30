import { useState } from "react";

export default function useSelect(notes) {
    const [selectedId, setselectedId] = useState([]);
    const selectLength = selectedId?.length;
    const clearSelect = () => {
        setselectedId([]);
    };
    const allItems = () => {
        const items = [];
        if (notes?.length === 0 || !notes || notes === null) return;
        for (let i = 0; i < notes.length; i++) {
            const id = notes[i]?.id;
            items.push(id);
        }
        return items
    };

    return { allItems, selectLength, selectedId, setselectedId, clearSelect }
}
