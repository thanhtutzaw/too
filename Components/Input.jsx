import React from "react";
import s from "../Components/Notes/Notes.module.css";

export default function Input({
  height,
  textRef,
  titleRef,
  textInput,
  titleInput,
  note = null,
  settextInput,
  settitleInput,
}) {
  return (
    <div style={{ height: height }} className={s.viewContent}>
      <Label
        label="Title"
        titleInput={titleInput}
        className={s.titleSpan}
        focus={titleInput !== ""}
      />
      <h3
        role="input"
        ref={titleRef}
        contentEditable
        spellCheck="true"
        aria-label="title"
        onInput={() => settitleInput(titleRef.current.innerText)}
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
        ref={textRef}
        contentEditable
        aria-label="text"
        spellCheck="true"
        className={s.textView}
        onInput={() => settextInput(textRef.current.innerText)}
      >
        {note && note?.text}
      </p>
    </div>
  );
}
function Label({ focus, className, label }) {
  const opacity = focus ? "0" : ".5";
  return (
    <span style={{ opacity }} className={className}>
      {label}
    </span>
  );
}
