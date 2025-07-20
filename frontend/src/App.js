import Nav from "./Dashboard/nav";
import LeftComponent from "./Dashboard/left-comp";
import RightComponent from "./Dashboard/right-comp";

function App() {
  return (
    <div className="App">
      <div className="nav" style={{ height: "10dvh", width: "100%" }}>
        <Nav />
      </div>

      <div
        className="component"
        style={{
          height: "90dvh",
          width: "100%",
          // backgroundColor: "red"
        }}
      >
        <div
          className="row"
          style={{
            height: "90dvh",
            width: "100.75%",
            // backgroundColor: "red"
          }}
        >
          <div className="col-4 border">
            <LeftComponent />
          </div>
          <div className="col-8 border">
            <RightComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
