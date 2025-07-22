import React, { useEffect, useMemo, useState } from "react";
const textBlock =
  "Ledio cun flori. Pa nuse. Test test. This is a test. Ledio likes flowers. Test again. Ledio and Pa nuse are friends.";

export default function Task1() {
   const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(0);

  const matchIndices = useMemo(() => {
    if (!search) return [];
    const regex = new RegExp(search, "gi");
    const indices: number[] = [];
    let match;
    while ((match = regex.exec(textBlock))) {
      indices.push(match.index);
      // Prevent infinite loop for zero-length matches
      if (regex.lastIndex === match.index) regex.lastIndex++;
    }
    return indices;
  }, [search]);

  function getHighlightedText() {
    if (!search || matchIndices.length === 0) return textBlock;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    matchIndices.forEach((start, i) => {
      const end = start + search.length;
      parts.push(textBlock.slice(lastIndex, start));
      parts.push(
        <b
          key={i}
          style={{
            backgroundColor: i === current ? "#e8bb49" : "#ffeeba",
            borderBottom: i === current ? "2px solid #d39e00" : undefined,
          }}
        >
          {textBlock.slice(start, end)}
        </b>
      );
      lastIndex = end;
    });
    parts.push(textBlock.slice(lastIndex));
    return parts;
  }
   const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + matchIndices.length) % matchIndices.length);
  };
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % matchIndices.length);
  };

  React.useEffect(() => {
    setCurrent(0);
  }, [search]);
   return (
    <div>
      <label htmlFor="searchInput">Search</label>
      <input
        id="searchInput"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <button onClick={handlePrev} disabled={matchIndices.length === 0}>
        Previous
      </button>
      <button onClick={handleNext} disabled={matchIndices.length === 0}>
        Next
      </button>
      <span style={{ marginLeft: 8 }}>
        {matchIndices.length > 0
          ? `${current + 1} / ${matchIndices.length}`
          : "No matches"}
      </span>
      <div style={{ marginTop: 16, lineHeight: "2" }}>{getHighlightedText()}</div>
    </div>
  );
}





  // reference per ledion :https://codesandbox.io/p/sandbox/react-highlight-text-slnfo?file=%2Fsrc%2FApp.js%3A32%2C1-44%2C2