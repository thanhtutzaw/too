export default function AddConfirm(props) {
  const { setactive, addConfirmRef } = props;
  const close = () => addConfirmRef.current?.close();
  const discard = () => {
    close();
    window.location.hash = "home";
    setactive(false);
    console.log("%cCanceled", "color:grey");
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
