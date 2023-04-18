import React from "react";
import s from "./Notes.module.css";
import { BiArrowBack } from "react-icons/bi";

export default function ViewHeader({
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
        disabled={loading}
        onClick={submitHandle}
        tabIndex="0"
        className="addBtn"
      >
        {loading ? "Updating" : "Update"}
      </button>
    </div>
  );
}
