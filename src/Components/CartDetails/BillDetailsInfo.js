import React, { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../context/FilterContext";

const BillDetailsInfo = ({
  data,
  goldMemberShip,
  couponPrice,
  overAllPrice,
  mainPrice,
}) => {
  // const [overAllPrice, setoverAllPrice] = useState(0);

  const { symbol } = useContext(FilterContext);
  const calculateOverallPrice = () => {
    // let calculatedPrice = 0;
    // data?.forEach((item) => {
    //   const variant = item?.variants[0];
    //   if (variant) {
    //     const discount = variant.variant_price_details[0].discount;
    //     const price = variant.variant_price_details[0].price;
    //     const discountedPrice = price - (price * discount) / 100;
    //     const totalPriceForProduct = discountedPrice * item.quantity;
    //     calculatedPrice += totalPriceForProduct;
    //   }
    // });
    // if (couponPrice) {
    //   setoverAllPrice(
    //     Number(overAllPrice) -
    //       (Number(overAllPrice) * Number(couponPrice?.value)) / 100
    //   );
    // } else {
    //   setoverAllPrice(Number(overAllPrice));
    // }
  };

  // const calCulateInvidualPrice = () => {
  //   const discount = data.variant_price_details[0].discount;
  //   const price = data.variant_price_details[0].price;

  //   const discountedPrice = price - (price * discount) / 100;
  //   const totalPriceForProduct = discountedPrice * data.quantity;

  //   setoverAllPrice(totalPriceForProduct);
  // };

  // useEffect(() => {
  //   if (data?.buynow) {
  //     // calCulateInvidualPrice();
  //   } else {
  //     calculateOverallPrice();
  //   }
  // }, [couponPrice?.value, overAllPrice]);
  // console.log(
  //   "overAllPrice",
  //   overAllPrice,
  //   "Tanuj",
  //   couponPrice?.value,
  //   mainPrice
  // );
  return (
    <>
      <div className="bill-details-box">
        <div className="total-price">
          <h2>Total Price</h2>
          <h2>
            {symbol || "₹"}
            {Number(mainPrice)?.toFixed(2)}
          </h2>
        </div>
        <div className="apply-coupen">
          <h2>Coupon Price</h2>
          <h3>
            -{symbol || "₹"}
            {/* {(
              (Number(mainPrice) * Number(couponPrice?.value)) / 100 || 0
            )?.toFixed(2)} */}
            {couponPrice?.type === "fixed"
              ? Number(couponPrice?.value)?.toFixed(2)
              : (
                  (Number(mainPrice) * Number(couponPrice?.value)) / 100 || 0
                )?.toFixed(2)}
          </h3>
        </div>
        {/* <div className="final-price">
          <h2>Final Price</h2>
          <h2>
            {symbol || "₹"}
            {Number(overAllPrice)?.toFixed(2)}
          </h2>
        </div> */}
        {/* <div className="membership-discount">
          <h2>Gold Membership Discount</h2>
          <h2>
            -{symbol || "₹"}
            {goldMemberShip}
          </h2>
        </div>
        <div className="after-discount">
          <h2>Total After Discount</h2>
          <h3>
            {symbol || "₹"}
            {(overAllPrice - couponPrice - goldMemberShip)?.toFixed(2)}
          </h3>
        </div> */}
        <div className="payable">
          <h2>Total payable</h2>
          <h2>
            {symbol || "₹"}
            {Number(overAllPrice)?.toFixed(2)}
          </h2>
        </div>
      </div>
    </>
  );
};

export default BillDetailsInfo;
