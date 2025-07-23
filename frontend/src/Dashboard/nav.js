import '../styles/nav.css'

export default function Nav({ mobileResp }) {
  return (
    <div className={`${!mobileResp ? 'nav-child' : 'nav-child-res'}`}>
      <h3
        className={`${!mobileResp ? 'h3' : 'h3-res'}`}
      >
        <img
          width={`${!mobileResp ? "60" : '35'}`}
          height={`${!mobileResp ? "60" : '35'}`}
          src="https://img.icons8.com/color-glass/48/candle-sticks.png"
          alt="candle-sticks"
        />
        Stock Dashboard
      </h3>
      <button
        className={`${!mobileResp ? 'nav-btn' : 'nav-btn-res'}`}
      >
        <i className="fa-solid fa-user fs-4"></i>
        USER
      </button>
    </div>
  );
}
