import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function BarDetails({ stockName, setValForBar }) {
  const [stockDetails, setStockDetails] = useState([]);
  const [stats, setStats] = useState({
    high: null,
    low: null,
    avgVolume: null,
  });

  useEffect(() => {
    const getData = async () => {
      if (!stockName) return;
      const url = `http://localhost:1000/stocks/${stockName}`;
      try {
        const response = await fetch(url, { method: "GET" });
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

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "1rem",
        boxShadow: "0px 0px 20px 5px black",
      }}
    >
      <span
        style={{
          height: "10%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <h2>{stockName}</h2>
        <p><strong>52-Week High:</strong> {stats.high}</p>
        <p><strong>52-Week Low:</strong> {stats.low}</p>
        <p><strong>Avrage Volume:</strong> {stats.avgVolume}</p>
      </span>

      <div style={{ padding: "0 1rem", marginTop: "1rem" }}>
        <ReactApexChart
          options={options}
          series={series}
          type="candlestick"
          height={450}
        />
      </div>
      <span
        style={{
          width: "100%",
          height: "10%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <button className="bar-close" onClick={() => setValForBar(false)}>
          <i style={{ margin: 0 }} className="fa-solid fa-xmark"></i>
        </button>
      </span>
    </div>
  );
}
