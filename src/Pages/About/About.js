import React, { useEffect } from "react";
import SmallBanner from "../../Components/Common/SmallBanner/SmallBanner";
import Section2 from "../../Components/About/Section2";
import Section3 from "../../Components/About/Section3";
import Collections from "../../Components/Common/Collections/Collections";
import Twoboxes from "../../Components/About/Twoboxes";

const About = ({ landingPageData }) => {
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <div>
      <SmallBanner
        smallBannerImage={"about_us.webp"}
        smallBannerHead={"About Us"}
        smallBannerPara={"Do not forget to use your 2023 vision benefits"}
      />
      <Section2 />
      <Section3 />
      <Collections landingPageData={landingPageData} />
      <Twoboxes />
    </div>
  );
};

export default About;
