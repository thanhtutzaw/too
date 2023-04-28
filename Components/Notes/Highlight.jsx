import React from "react";

export function Highlight({ highlight, query }) {
  const q = query;
  const searchIndex = highlight.toLowerCase().indexOf(q?.toLowerCase());
  if (searchIndex === -1) {
    return <>{highlight}</>;
  }
  const before = highlight.slice(0, searchIndex);
  const match = highlight.slice(searchIndex, searchIndex + q.length);
  const after = highlight.slice(searchIndex + q.length);
  return (
    <>
      <span>
        {before}
        <mark>{match}</mark>
        {after}
      </span>
    </>
  );
}
