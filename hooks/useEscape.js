import { useEffect } from "react";

export default function useEscape(escape) {
    useEffect(() => {
        function handleEscape(e) {
            if (!(e.key === "Escape")) return;
            escape()
        }
        window.addEventListener("keyup", handleEscape);
        return () => window.removeEventListener("keyup", handleEscape);
    }, [escape]);
}

