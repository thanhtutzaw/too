import React from "react";
import { BiArrowBack } from "react-icons/bi";
import s from "../../Components/Notes/Notes.module.css";

export default function ViewHeader({
  children,
  exitHandle,
  submitHandle,
  loading = false,
}) {
  const pointerEvents = loading ? "none" : "initial";
  const Submit = children ? children : loading ? "Updating" : "Update";
  return (
    <div className={s.viewHeader}>
      <div className="backBtn">
        <BiArrowBack onClick={exitHandle} />
      </div>
      <button
        tabIndex="0"
        disabled={loading}
        className="submitBtn"
        onClick={submitHandle}
        style={{ pointerEvents }}
      >
        {Submit}
      </button>
    </div>
  );
}
