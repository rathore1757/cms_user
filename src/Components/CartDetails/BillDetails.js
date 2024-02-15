import React, { useContext, useEffect, useState } from "react";
import {
  faArrowRight,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BillDetailsInfo from "./BillDetailsInfo";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import { FilterContext } from "../../context/FilterContext";

const BillDetails = ({ data }) => {
  const [show, setShow] = useState(false);
  const [mainPrice, setMainPrice] = useState(0);
  const [overAllPrice, setoverAllPrice] = useState(0);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [couponPrice, setCouponPrice] = useState(0);
  const [selectedCoupon1, setSelectedCoupon1] = useState();
  const [goldMemberShip, setGoldMembershipPrice] = useState(0);
  const { country_code, symbol, selectedCoupon, setSelectedCoupon } =
    useContext(FilterContext);
  const countryCode = country_code || "IN";
  const [couponsData, setCouponsData] = useState(null);
  const getDiscountText = (val) => {
    if (val.type == "percent") {
      return `EXTRA ${val.value} % Discount`;
    } else if (val.type == "fixed") {
      return `FLAT ${symbol || "₹"} ${val.value} Discount`;
    }
  };
  const handleSelectCoupon = () => {
    // console.log(selectedCoupon1);
    setSelectedCoupon(selectedCoupon1);
    handleClose();
    if (selectedCoupon1?.type === "fixed") {
      setoverAllPrice(Number(mainPrice) - Number(selectedCoupon1?.value));
    } else {
      setoverAllPrice(
        Number(mainPrice) -
          (Number(mainPrice) * Number(selectedCoupon1?.value)) / 100
      );
    }
  };
  const handleRemoveCoupon = () => {
    setSelectedCoupon(null);
    setSelectedCoupon1(null);
    setoverAllPrice(Number(mainPrice));
    handleClose();
  };
  const getCouponsData = () => {
    let config = {
      url: `${environmentVar?.apiUrl}/api/user/coupons/get_available_coupons?category=0&product=0&variant=0&price=${overAllPrice}&country=${countryCode}`,
      method: "get",
      withCredentials: true,
    };
    axios
      .request(config)
      .then((response) => setCouponsData(response?.data?.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (overAllPrice > 0) {
      getCouponsData();
    }
  }, [data, show]);

  const navigate = useNavigate(null);

  const calculateOverallPrice = () => {
    let calculatedPrice = 0;

    data?.forEach((item) => {
      const variant = item?.variants[0];

      if (variant) {
        const discount = variant?.variant_price_details?.[0]?.discount;
        const price = variant?.variant_price_details?.[0]?.price;

        const discountedPrice = price - (price * discount) / 100;
        const totalPriceForProduct = discountedPrice * item.quantity;

        calculatedPrice += totalPriceForProduct;
      }
    });
    setMainPrice(calculatedPrice);
    setoverAllPrice(calculatedPrice);
  };
  useEffect(() => {
    calculateOverallPrice();
  }, [data]);

  return (
    <>
      <Col lg={4}>
        <h1 className="cart-heading">Bill Details</h1>
        <BillDetailsInfo
          data={data}
          couponPrice={selectedCoupon}
          goldMemberShip={goldMemberShip}
          overAllPrice={overAllPrice}
          mainPrice={mainPrice}
          setMainPrice={setMainPrice}
          setoverAllPrice={setoverAllPrice}
        />
        <div className="apply-coupens-main">
          <div className="apply-coupens-main-left">
            <h2>Apply Coupon</h2>
            <h3>Check available offers</h3>
          </div>
          <div className="apply-coupens-main-right" onClick={handleShow}>
            <FontAwesomeIcon
              icon={faArrowRightLong}
              size="2x"
              className="apply-arrow-icon"
            />
          </div>

          <Modal show={show} onHide={handleClose} className="coupon-modal-main">
            <div className="modal-inputs-coupon">
              <h2>Coupons for you</h2>
              <div style={{ position: "relative" }} className="entercode">
                <div className="modal-inputs-remove">
                  <input
                    value={selectedCoupon1?.code || ""}
                    type="text"
                    placeholder="ENTER COUPON CODE "/>
                  <div className="remove-text"
                    onClick={handleRemoveCoupon} >
                    remove
                  </div>
                </div>
                <button onClick={handleSelectCoupon} className="coupon-apply-button">
                  Apply
                </button>
              </div>
              <h3>Best Offers for you</h3>
              {couponsData && couponsData.length > 0 ? (
                <>
                  {couponsData.map((val) => (
                    <div className="apply-coupon-box">
                      <div className="apply-coupon-box-left">
                        <h2 style={{ textTransform: "uppercase" }}>
                          {val?.name}
                        </h2>
                        <h3>{`${getDiscountText(val)}`}</h3>
                        {/* <h4>Use Coupon SINGLE</h4> */}
                        {/* <h5>Terms & Conditions</h5> */}
                      </div>
                      <div className="apply-coupon-button">
                        <h2 onClick={() => setSelectedCoupon1(val)}>Select</h2>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>No Coupons Available for selected Country</>
              )}
            </div>
          </Modal>
        </div>
        <div
          className="proceed-button"
          onClick={() => navigate("/checkout", { state: data })}
        >
          Proceed to checkout
        </div>
      </Col>
    </>
  );
};

export default BillDetails;
