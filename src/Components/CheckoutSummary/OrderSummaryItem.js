import React, { useContext } from "react";
import orderSummaryItemImg from "../../Images/orderSummaryItem-Img.webp";
import { FilterContext } from "../../context/FilterContext";
import { environmentVar } from "../../config/environmentVar";

const OrderSummaryItem = ({ data, index }) => {
  // console.log("fff111", data);
  const { symbol } = useContext(FilterContext);
  let totalDiscount = data?.buynow
    ? Number(data?.variant_price_details?.[0]?.discount)
    : Number(data?.variants?.[0]?.variant_price_details?.[0]?.discount);

  let totalPrice = data?.buynow
    ? Number(data?.variant_price_details?.[0]?.price)
    : Number(data?.variants?.[0]?.variant_price_details?.[0]?.price);
  return (
    <>
      <div className="Order-summary-item-imgdetailprice-main" key={index}>
        <div className="Order-summary-item-imgdetailprice">
          <div className="Order-summary-item-imgdetail">
            {data?.buynow ? (
              <img
                src={`${
                  environmentVar?.apiUrl
                }/uploads/${data?.thumbnail_url?.replace(/"/g, "")}`}
                style={{ width: "140px" }}
              />
            ) : (
              <img
                src={`${environmentVar?.apiUrl}/uploads/${
                  data?.variants?.[0]?.thumbnail_url?.replace(/"/g, "") ||
                  data?.thumbnail_img?.replace(/"/g, "")
                }`}
                style={{ width: "140px" }}
              />
            )}

            <div className="Order-summary-item-details">
              <p>
                {data?.buynow
                  ? data?.variant_name
                  : data?.variants?.[0]?.variant_name}
              </p>
              <h4>Qty: {data?.quantity}</h4>
            </div>
          </div>
          <div className="Order-summary-item-price">
            {symbol || "₹"}
            {Number(
              (totalPrice - (totalPrice * totalDiscount) / 100) * data?.quantity
            )?.toFixed(2)}
          </div>
        </div>
        {/* <h2>+ Enter a promo code</h2> */}
      </div>
    </>
  );
};

export default OrderSummaryItem;
