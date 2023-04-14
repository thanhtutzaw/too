import { useState } from "react";

export default function useSelect() {
    const [selectedId, setselectedId] = useState([]);
    return { selectedId, setselectedId }
}
