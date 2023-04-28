export default function ConfirmModal(props) {
  const { closeEdit, confirmModalRef } = props;
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
          closeEdit();
          console.log("%cCanceled", "color:grey");
        }}
      >
        Discard
      </button>
    </div>
  );
}
