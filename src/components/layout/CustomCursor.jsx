export default function CustomCursor() {
  return (
    <>
      <div className="mouseCursor cursor-outer"></div>
      <div className="mouseCursor cursor-inner">
        <span>
          <i className="tji-angle-left"></i>Drag<i className="tji-angle-right"></i>
        </span>
      </div>
    </>
  );
}
