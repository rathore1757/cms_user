import React, { useEffect } from "react";
import TermsBanner from "../../Components/Common/TermsBanner/TermsBanner";
import TermsContent from "../../Components/TermsContent/TermsContent";

const TermsConditions = () => {
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <TermsBanner heading={"Terms & Conditions"} />
      <TermsContent />
    </>
  );
};

export default TermsConditions;
