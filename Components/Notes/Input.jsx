import React from "react";
import s from "./Notes.module.css";

export default function Input({
  height,
  titleInput,
  settitleInput,
  titleRef,
  note = null,
  textInput,
  settextInput,
  textRef,
}) {
  return (
    <div style={{ height: height }} className={s.viewContent}>
      <Label
        focus={titleInput !== ""}
        label="Title"
        className={s.titleSpan}
        titleInput={titleInput}
      />
      <h3
        aria-label="title"
        spellCheck="true"
        onInput={() => settitleInput(titleRef.current.innerText)}
        ref={titleRef}
        role="input"
        style={{
          outline: "none",
        }}
        contentEditable
      >
        {note && note?.title}
      </h3>
      <Label
        focus={textInput !== ""}
        label="Text"
        className={s.textSpan}
        titleInput={titleInput}
      />
      <p
        aria-label="text"
        spellCheck="true"
        onInput={() => settextInput(textRef.current.innerText)}
        ref={textRef}
        className={s.textView}
        contentEditable
      >
        {note && note?.text}
      </p>
    </div>
  );
}

function Label({ focus, className, label }) {
  return (
    <span
      style={{
        opacity: focus ? "0" : ".5",
      }}
      className={className}
    >
      {label}
    </span>
  );
}
