export default function AddConfirm(props) {
  const { setactive, addConfirmRef } = props;
  const close = () => addConfirmRef.current?.close();
  const discard = () => {
    close();
    console.log("close with discard")
    window.location.hash = "home";
    setactive(false);
    console.log("add note canceled");
  };
  return (
    <div className="confirmModal">
      <p>Changes may not be saved.</p>
      <button className="keepEditingBtn" onClick={close}>
        Continue Editing
      </button>
      <button className="discardBtn" onClick={discard}>
        Discard
      </button>
    </div>
  );
}
