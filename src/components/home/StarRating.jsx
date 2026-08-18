export default function StarRating({ width = 100 }) {
  return (
    <div className="star-ratings">
      <div className="fill-ratings" style={{ width: `${width}%` }}>
        <span>★★★★★</span>
      </div>
      <div className="empty-ratings">
        <span>★★★★★</span>
      </div>
    </div>
  );
}
