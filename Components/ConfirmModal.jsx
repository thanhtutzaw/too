import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ConfirmModal(props) {
  const { setShowAction } = useContext(AppContext);
  const { setactiveNote, confirmModalRef } = props;
  const close = () => confirmModalRef.current?.close();
  return (
    <div className="confirmModal">
      <p>Discard Changes ?</p>
      <button className="keepEditingBtn" onClick={close}>
        Keep Editing
      </button>
      <button
        className="discardBtn"
        onClick={() => {
          close();
          window.location.hash = "home";
          setactiveNote(null);
          setactiveNote("");
          setShowAction("");
          console.log("edit canceled");
        }}
      >
        Discard
      </button>
    </div>
  );
}
