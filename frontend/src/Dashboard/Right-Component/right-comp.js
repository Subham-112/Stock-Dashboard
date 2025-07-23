import '../../styles/right.css'
import BarDetails from "./Bar-Details";
import Empty from "./Empty";

export default function DataComponent({
  showBar,
  stockName,
  setValForBar,
  responMobile,
  closePopup,
}) {
  return (
    <>
      {showBar ? (
        <div className="bar-details">
          <BarDetails
            closePopup={closePopup}
            stockName={stockName}
            setValForBar={setValForBar}
            responMobile={responMobile}
          />
        </div>
      ) : (
        <div className="h-100 empty">
          <Empty />
        </div>
      )}
    </>
  );
}
