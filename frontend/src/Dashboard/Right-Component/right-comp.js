import BarDetails from "./Bar-Details";
import Empty from "./Empty";

export default function DataComponent({ showBar, stockName, setValForBar }) {
  return (
    <>
      {showBar ? (
        <div className="h-100 w-100 bar-details">
          <BarDetails stockName={stockName} setValForBar={setValForBar} />
        </div>
      ) : (
        <div className="h-100 empty">
          <Empty />
        </div>
      )}
    </>
  );
}
