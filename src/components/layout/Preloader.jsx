export default function Preloader() {
  return (
    <div className="preloader">
      <div className="loading-container">
        <div className="loading"></div>
        <div id="loading-icon">
          <img src="/assets/images/loader.svg" alt="loader" />
        </div>
      </div>
    </div>
  );
}
