export default function Nav() {
  return (
    <div className="w-100 d-flex justify-content-between align-items-center">
      <h3 className="w-25 fs-2 fw-bold ms-5">Stock Dashboard</h3>
      <button
        className="fs-5 fw-bold me-5 p-2 ps-4 pe-4 d-flex justify-content-center align-items-center gap-2"
        style={{
          border: "3px solid #01F5FD",
          borderRadius: "20px",
          backgroundColor: "#242424ff",
          color: "white",
        }}
      >
        <i className="fa-solid fa-user fs-4"></i>
        USER
      </button>
    </div>
  );
}
