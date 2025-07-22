import Nav from "./Dashboard/nav";
import LeftComponent from "./Dashboard/left-comp";
import RightComponent from "./Dashboard/Right-Component/right-comp";
import { useState } from "react";

function App() {
  const [stockName, setStockName] = useState("");
  const [showBarDetails, setShowBarDetails] = useState(false);

  const StockNmAndShowBar = (name) => {
    setStockName(name);
  };

  const showBarDet = (val) => {
    setShowBarDetails(val);
  };

  return (
    <div
      className="container"
      style={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <div
        className="nav"
        style={{ height: "8dvh", width: "100%", marginBottom: "1rem" }}
      >
        <Nav />
      </div>
      <div
        style={{
          height: "85dvh",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "1.5rem",
          marginLeft: "-1rem",
        }}
      >
        <div className="p-0 col-4 rounded-4"
          style={{height: '100%'}}
        >
          <LeftComponent
            showBar={showBarDetails}
            StockNmAndShowBar={StockNmAndShowBar}
            setValForBar={showBarDet}
          />
        </div>
        <div className="p-0 col-8 rounded-4"
          style={{height: '100%'}}
        >
          <RightComponent
            showBar={showBarDetails}
            setValForBar={showBarDet}
            stockName={stockName}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
