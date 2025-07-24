import { useEffect, useState } from "react";

export default function LeftComponent({
  showBar,
  StockNmAndShowBar,
  setValForBar,
  openPopup,
  responMobile,
}) {
  const [stocks, setStocks] = useState([
    {
      symbol: "",
    },
  ]);

  useEffect(() => {
    const stockName = async () => {
      try {
        const response = await fetch(
          `https://stock-dashboard-oufr.onrender.com/stocks?nocache=${Date.now()}`,
          {
            method: "GET",
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );
        // console.log("api", import.meta.env.VITE_BACKEND_URL);
        const data = await response.json();
        // console.log(data)

        setStocks(data);
      } catch (error) {
        console.error("Error fetching stock data:-", error);
      }
    };

    stockName();
  }, []);

  const printVal = (e) => {
    StockNmAndShowBar(e.target.innerText);
    setValForBar(true);
    openPopup(true);
  };

  return (
    <div
      className="h-100 pt-3 ps-3"
      style={{
        borderRadius: "1rem",
        boxShadow: "0px 0px 20px 5px black",
      }}
    >
      <ol className="ms-3 fs-5 d-flex flex-column gap-4">
        {stocks.map((stock, index) => (
          <li
            onClick={(e) => printVal(e)}
            style={{ fontWeight: 600, cursor: "pointer" }}
            key={index}
          >
            {stock.symbol}
          </li>
        ))}
      </ol>
    </div>
  );
}
