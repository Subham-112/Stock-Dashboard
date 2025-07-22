export default function Nav() {
  return (
    <div className="w-100 d-flex justify-content-between align-items-center">
      <h3
        className="w-50 fs-2 fw-bold d-flex justify-content-start align-items-center gap-2"
        style={{
          fontFamily: "Young Serif, serif",
          fontWeight: 400,
          letterSpacing: '1px',
          margin: 0
        }}
      >
        <img
          width="60"
          height="60"
          src="https://img.icons8.com/color-glass/48/candle-sticks.png"
          alt="candle-sticks"
        />
        Stock Dashboard
      </h3>
      <button
        className="fs-5 fw-bold p-2 ps-4 pe-4 d-flex justify-content-center align-items-center gap-2"
        style={{
          border: "3px solid #01F5FD",
          borderRadius: "20px",
          backgroundColor: "#242424ff",
          color: "white",
          marginRight: "2rem",
        }}
      >
        <i className="fa-solid fa-user fs-4"></i>
        USER
      </button>
    </div>
  );
}
