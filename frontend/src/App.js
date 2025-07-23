import "./styles/App.css";
import Nav from "./Dashboard/nav";
import LeftComponent from "./Dashboard/left-comp";
import RightComponent from "./Dashboard/Right-Component/right-comp";
import { useState } from "react";

export default function App() {
  const [stockName, setStockName] = useState("");
  const [showBarDetails, setShowBarDetails] = useState(false);
  const [isMobileResponsive, setIsMobileResponsive] = useState(
    window.innerWidth <= 394
  );
  const [responMobile, setResponMobile] = useState(false);

  const StockNmAndShowBar = (name) => {
    setStockName(name);
    if (window.innerWidth <= 400) {
      setResponMobile(true);
    }
  };

  const showBarDet = (val) => {
    setShowBarDetails(val);
  };

  const handleOpenClose = (val) => {
    if(window.innerWidth <= 400 || responMobile) {
      setResponMobile(val);
    }
  };

  return (
    <div className="app">
      <div className={`${!isMobileResponsive ? "nav" : "nav-resp"}`}>
        <Nav mobileResp={isMobileResponsive} />
      </div>
      <div className="lft-rit">
        <div className={`${!isMobileResponsive ? "left" : "left-resp"}`}>
          <LeftComponent
            responMobile={responMobile}
            openPopup={handleOpenClose}
            showBar={showBarDetails}
            StockNmAndShowBar={StockNmAndShowBar}
            setValForBar={showBarDet}
          />
        </div>

        {!isMobileResponsive || responMobile ? (
          <div className={`${!responMobile ? "right" : "right-resp"}`}>
            <RightComponent
              responMobile={responMobile}
              closePopup={handleOpenClose}
              showBar={showBarDetails}
              setValForBar={showBarDet}
              stockName={stockName}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}