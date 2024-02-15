import React, { useEffect } from "react";
import TermsBanner from "../../Components/Common/TermsBanner/TermsBanner";
import TrackOrderContent from "../../Components/TrackOrderSections/TrackOrderContent";

const TrackOrder = () => {
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <>
      <TermsBanner
        heading={"Track Order"}
        para={"Enter your order number to view status."}
        isActive={true}
      />
      <TrackOrderContent />
    </>
  );
};

export default TrackOrder;
