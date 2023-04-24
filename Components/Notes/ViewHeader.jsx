import React from "react";
import s from "./Notes.module.css";
import { BiArrowBack } from "react-icons/bi";

export default function ViewHeader({
  children,
  exitHandle,
  submitHandle,
  loading = false,
}) {
  return (
    <div className={s.viewHeader}>
      <div className="backBtn">
        <BiArrowBack onClick={exitHandle} />
      </div>
      <button
        style={{
          pointerEvents: loading ? "none" : "initial",
        }}
        disabled={loading}
        onClick={submitHandle}
        tabIndex="0"
        className="submitBtn"
      >
        {children ? children : loading ? "Updating" : "Update"}
      </button>
    </div>
  );
}
