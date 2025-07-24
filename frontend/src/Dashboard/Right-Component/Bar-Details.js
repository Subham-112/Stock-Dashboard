import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function BarDetails({
  stockName,
  setValForBar,
  responMobile,
  closePopup,
}) {
  const [stockDetails, setStockDetails] = useState([]);
  const [stats, setStats] = useState({
    high: null,
    low: null,
    avgVolume: null,
  });

  useEffect(() => {
    const getData = async () => {
      if (!stockName) return;
      try {
        const response = await fetch(
          `https://stock-dashboard-oufr.onrender.com/stocks/${stockName}?nocache=${Date.now()}`,
          {
            method: "GET",
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );
        const data = await response.json();

        const formatted = data.map((item) => ({
          x: item.date,
          y: [item.open, item.high, item.low, item.close],
        }));

        const highs = data.map((item) => item.high);
        const lows = data.map((item) => item.low);
        const volumes = data.map((item) => item.volume || 0);

        const high = Math.max(...highs);
        const low = Math.min(...lows);
        const avgVolume =
          volumes.reduce((acc, cur) => acc + cur, 0) / volumes.length;

        setStockDetails(formatted);
        setStats({
          high: high.toFixed(2),
          low: low.toFixed(2),
          avgVolume: Math.round(avgVolume),
        });
      } catch (err) {
        console.error({ err: err.message });
      }
    };

    getData();
  }, [stockName]);

  const options = {
    chart: {
      type: "candlestick",
      height: 500,
      background: "#1f1f2e",
      toolbar: {
        show: true,
      },
      animations: {
        enabled: false,
      },
      zoom: {
        enabled: false,
        autoScaleYaxis: false,
      },
    },
    title: {
      text: `${stockName} Stock Price`,
      align: "left",
      style: {
        color: "#fff",
      },
    },
    xaxis: {
      type: "category",
      labels: {
        style: {
          colors: "#fff",
        },
      },
    },
    yaxis: {
      range: [805, 825],
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        },
        style: {
          colors: "#fff",
        },
      },
    },
  };

  const series = [
    {
      data: stockDetails,
    },
  ];

  const handleClose = () => {
    setValForBar(false);
    closePopup();
  };

  return (
    <div className={`${responMobile ? "bar-resp" : "bar"}`}>
      <span className={`${responMobile ? "bar-52-resp" : "bar-52"}`}>
        <h2 className={`${responMobile ? "bar-h2-resp" : "bar-h2"}`}>
          {stockName}
        </h2>
        <span className={`${responMobile ? "bar-span-resp" : "bar-span"}`}>
          <p>
            <strong>52-Week High:</strong> {stats.high}
          </p>
          <p>
            <strong>52-Week Low:</strong> {stats.low}
          </p>
          <p>
            <strong>Avrage Volume:</strong> {stats.avgVolume}
          </p>
        </span>
      </span>

      <div className={`${responMobile ? "chart-resp" : "chart"}`}>
        <ReactApexChart
          options={options}
          series={series}
          type="candlestick"
          width={responMobile ? 340 : 930}
          height={responMobile ? 430 : 420}
        />
      </div>
      <span
        className={`${responMobile ? "bar-btn-span-resp" : "bar-btn-span"}`}
      >
        <button
          className="bar-close"
          style={
            responMobile
              ? {
                  width: "50%",
                  height: "60px",
                  fontSize: "0.9rem",
                }
              : {}
          }
          onClick={() => handleClose()}
        >
          <i style={{ margin: 0 }} className="fa-solid fa-xmark"></i>
        </button>
      </span>
    </div>
  );
}
