import React, { useEffect, useMemo, useState } from "react";
const list = [
    "Ledio cun flori",
    "Pa nuse",
    "Test test",
    "this is a test"
];

export default function Task1() {
    const [text, setText] = useState("");

    return (
        <div>
         <label htmlFor="textInput">Text</label>
         <input id="textInput" value={text} onChange={e => setText(e.target.value)} />
         {list.map((item, index) => (
            <Compo key={index} highlight={text} value={item} />
          ))}
        </div>
    );
}
const Compo = ({ highlight, value }: { highlight: string; value: string }) => {
    return <p>{getHighlightedText(value, highlight)}</p>;
};
  
  function getHighlightedText(text: string, highlight: string) {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part.toLowerCase() === highlight.toLowerCase() ? (
          <b style={{ backgroundColor: "#e8bb49" }}>{part}</b>
        ) : (
          part
        )}
      </React.Fragment>
    ));
  }




  // reference per ledion :https://codesandbox.io/p/sandbox/react-highlight-text-slnfo?file=%2Fsrc%2FApp.js%3A32%2C1-44%2C2