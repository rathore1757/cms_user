import React, { useContext, useEffect, useState } from "react";
import HeroBanner from "../../Components/HeroBanner/HeroBanner";
import Collections from "../../Components/Common/Collections/Collections";
import BenefitsBanner from "../../Components/BenefitsBanner/BenefitsBanner";
import BestSeller from "../../Components/BestSeller/BestSeller";
import TryOn from "../../Components/TryOn/TryOn";
import FasionTrend from "../../Components/FasionTrend/FasionTrend";
import TheNext from "../../Components/TheNext/TheNext";
import Newsletter from "../../Components/Newsletter/Newsletter";
import { CartDetailContext } from "../../context/CartDetailContext";
import { environmentVar } from "../../config/environmentVar";
import axios from "axios";
import { useQuery } from "react-query";
// import SearchForMobile from "../../Components/Common/Header/SearchForMobile";
import AuthContext from "../../context/AuthContext";
import Category from "../../Components/Category/Category";

const Homepage = ({ landingPageData }) => {
  const { homeUpdate } = useContext(CartDetailContext);
  const { userInfo } = useContext(AuthContext);
  const [isCategoryMobile, setIsCategoryMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsCategoryMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, [homeUpdate]);

  const fetchBestSeller = async (userInfo) => {
    const response = await axios.get(
      `${environmentVar?.apiUrl}/api/user/best_seller/get?country_code=${userInfo?.country || "IN"
      }`
    );
    return response?.data?.data;
  };

  const { data, isLoading, error, refetch } = useQuery(
    ["bestseller", userInfo], // Use userInfo as part of the query key
    () => fetchBestSeller(userInfo),
    { enabled: false } // Disable automatic query fetching
  );

  console.log(userInfo);

  useEffect(() => {
    // Manually refetch when userInfo updates
    refetch();
  }, [userInfo, refetch]);

  return (
    <div>
      {/* <SearchForMobile /> */}
      <HeroBanner landingPageData={landingPageData} />
      {isCategoryMobile ? (
        <Category landingPageData={landingPageData} />
      )
        : (
          <Collections landingPageData={landingPageData} />
        )}
      <BenefitsBanner landingPageData={landingPageData} />
      <BestSeller landingPageData={landingPageData} data={data} />
      <TryOn landingPageData={landingPageData} />
      <FasionTrend landingPageData={landingPageData} data={data} />
      <TheNext landingPageData={landingPageData} />
      <Newsletter />
    </div>
  );
};

export default Homepage;
