import React, { useContext, useEffect, useState } from "react";
import BillDetailsInfo from "../CartDetails/BillDetailsInfo";
import { Col } from "react-bootstrap";
import "./OrderSummary.scss";
import OrderSummaryItem from "./OrderSummaryItem";
import PaymentOptions from "./PaymentOptions";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FilterContext } from "../../context/FilterContext";
import Loader from "../Common/Loader/Loader";
import {
  faArrowRight,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const OrderSummary = ({ selectedAddress, zipcode }) => {
  const createPaymentIntent = (sub_total, orderId) => {
    let data = {
      amount: Math.round(sub_total * 100).toString(),
      currency: "inr",
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/order/create_payment_intent`,
      withCredentials: true,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(sub_total);
        const clientSecret = response.data.data.client_secret;
        setIsSubmit(false);
        navigate("/payment", {
          state: {
            clientSecret: clientSecret,
            sub_total: sub_total,
            orderId: orderId,
          },
        });
      })
      .catch((error) => {
        setIsSubmit(false);
        toast.error(error?.response?.data?.message || error?.message, {
          autoClose: 2000,
        });
      });
  };
  const [show, setShow] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [payOption, setPayOption] = useState(1);
  const [payMethod, setPayMethod] = useState(null);
  const [paymentOptions, setPaymentOptions] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedCoupon1, setSelectedCoupon1] = useState();
  const [couponsData, setCouponsData] = useState(null);
  const [couponPrice, setCouponPrice] = useState(0);
  const [checkedTermConditions, setCheckedTermConditions] = useState(false);

  const [goldMemberShip, setGoldMembershipPrice] = useState(0);
  const navigate = useNavigate();
  const { country_code, symbol, selectedCoupon, setSelectedCoupon, shapeIds } =
    useContext(FilterContext);
  const countryCode = country_code || "IN";
  const [mainPrice, setMainPrice] = useState(0);
  const [overAllPrice, setoverAllPrice] = useState(0);
  const [availabilityError, setAvailabilityError] = useState("");

  const handleShow = () => setShow(true);
  const handleShowCoupon = () => setShowCoupon(true);
  const handleClose = () => setShow(false);
  const handleCloseCoupon = () => setShowCoupon(false);
  const getPaymentOptions = () => {
    let config = {
      url: `${environmentVar?.apiUrl}/api/payment/get_payment_options/${country_code}`,
      method: "get",
      withCredentials: true,
    };
    axios
      .request(config)
      .then((response) => {
        setPaymentOptions(response?.data?.data[0]);
        setPayMethod(response?.data?.data[0]?.payment_options[0]?.option);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getPaymentOptions();
  }, []);
  const location = useLocation();
  const checkAvailability = async () => {
    let config = {
      method: "get",
      url: `${environmentVar?.apiUrl}/api/user/zip_code/is_product_available?country_code=${countryCode}&zipcode=${zipcode}`,
    };

    try {
      const response = await axios.request(config);
      return response?.data?.success;
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message, {
        autoClose: 2000,
      });
    }
  };
  const ProceedToPayment = async () => {
    const checkAvailable = await checkAvailability();

    if (checkAvailable == false) {
      toast.error("Product not available on selected location", {
        autoClose: 2000,
      });
      setAvailabilityError("Product Not Available on Selected Location");
      return;
    }

    // console.log(555555000, location?.state);
    if (!checkedTermConditions) {
      toast.error("Please accept terms and conditions", {
        autoClose: 2000,
      });
      return;
    }
    Swal.fire({
      title: "Order Confirmation",
      text: "You are about to place order",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsSubmit(true);
        if (location?.state?.buynow) {
          let calculatedPrice = 0;
          const discount = location?.state?.variant_price_details[0].discount;
          const price = location?.state?.variant_price_details[0].price;

          const discountedPrice = price - (price * discount) / 100;
          const totalPriceForProduct =
            discountedPrice * location?.state.quantity;

          calculatedPrice += totalPriceForProduct;

          const sub_total = (
            calculatedPrice -
            couponPrice -
            goldMemberShip
          )?.toFixed(2);
          let data = {
            address_id: selectedAddress?.toString(),
            variant_quantity: [
              {
                variant_id: location?.state?.variant_id?.toString(),
                quantity: location?.state?.quantity,
                variant_name: location?.state?.title,
                thumbnail_url: location?.state?.thumbnail_url,
                product_id: location?.state?.product_id,
              },
            ],
            coupon_id: selectedCoupon?.id?.toString(),
            sub_total: overAllPrice?.toFixed(2),
            delivery_charges: "0",
            payment_method: payMethod,
            country_code: country_code,
          };
          // console.log("000000000000000", overAllPrice);
          let config = {
            method: "post",
            url: `${environmentVar?.apiUrl}/api/order/create_order`,
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
            data: data,
          };

          axios
            .request(config)
            .then((response) => {
              if (payOption == 1) {
                setIsSubmit(false);
                toast.success("Order created Successfully", {
                  autoClose: 2000,
                });
                navigate("/orderhistory");
              } else {
                createPaymentIntent(
                  overAllPrice?.toFixed(2),
                  response.data.order_id
                );
              }
            })
            .catch((error) => {
              setIsSubmit(false);
              toast.error(error?.response?.data?.message || error?.message, {
                autoClose: 2000,
              });
            });
        } else {
          const variantQuantityArray = location?.state.map((product) => {
            return {
              variant_id: product.product_variant_id?.toString(),
              quantity: product.quantity,
              variant_name: product?.variants?.[0]?.variant_name,
              thumbnail_url: product?.variants?.[0]?.thumbnail_url,
              product_id: product?.product_id,
            };
          });
          let calculatedPrice = 0;

          location?.state?.forEach((item) => {
            const variant = item?.variants[0];

            if (variant) {
              const discount = variant.variant_price_details[0].discount;
              const price = variant.variant_price_details[0].price;

              const discountedPrice = price - (price * discount) / 100;
              const totalPriceForProduct = discountedPrice * item.quantity;

              calculatedPrice += totalPriceForProduct;
              return calculatedPrice;
            }
          });
          const sub_total = (
            calculatedPrice -
            couponPrice -
            goldMemberShip
          )?.toFixed(2);

          console.log("kkkkk", sub_total, overAllPrice);
          let data = {
            address_id: selectedAddress?.toString(),
            variant_quantity: variantQuantityArray,
            coupon_id: selectedCoupon?.id?.toString(),
            sub_total: overAllPrice?.toFixed(2),
            delivery_charges: "0",
            payment_method: payMethod,
            country_code: country_code,
          };
          // console.log("00000", data);

          let config = {
            method: "post",
            url: `${environmentVar?.apiUrl}/api/order/create_order`,
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
            data: data,
          };

          axios
            .request(config)
            .then((response) => {
              if (payOption == 1) {
                setIsSubmit(false);
                toast.success("Order created Successfully", {
                  autoClose: 2000,
                });
                navigate("/orderhistory");
              } else {
                createPaymentIntent(
                  overAllPrice?.toFixed(2),
                  response.data.order_id
                );
              }
            })
            .catch((error) => {
              setIsSubmit(false);
              toast.error(error?.response?.data?.message || error?.message, {
                autoClose: 2000,
              });
            });
        }
      }
    });
  };

  const calculateOverallPrice = () => {
    if (location?.state?.buynow) {
      // console.log(location?.state?.variant_price_details?.[0], location?.state);
      const discount = location?.state?.variant_price_details[0].discount;
      const price = location?.state?.variant_price_details[0].price;

      const discountedPrice = price - (price * discount) / 100;
      const totalPriceForProduct = discountedPrice * location?.state?.quantity;
      setMainPrice(totalPriceForProduct);
      if (selectedCoupon?.type === "fixed") {
        setoverAllPrice(
          Number(totalPriceForProduct) - Number(selectedCoupon?.value)
        );
      } else if (selectedCoupon?.type === "percent") {
        setoverAllPrice(
          Number(totalPriceForProduct) -
            (Number(totalPriceForProduct) * Number(selectedCoupon?.value)) / 100
        );
      } else {
        setoverAllPrice(totalPriceForProduct);
      }
    } else {
      let calculatedPrice = 0;

      location?.state?.forEach((item) => {
        const variant = item?.variants[0];

        if (variant) {
          const discount = variant.variant_price_details[0].discount;
          const price = variant.variant_price_details[0].price;

          const discountedPrice = price - (price * discount) / 100;
          const totalPriceForProduct = discountedPrice * item.quantity;

          calculatedPrice += totalPriceForProduct;
        }
      });
      setMainPrice(calculatedPrice);
      if (selectedCoupon?.type === "fixed") {
        setoverAllPrice(
          Number(calculatedPrice) - Number(selectedCoupon?.value)
        );
      } else if (selectedCoupon?.type === "percent") {
        setoverAllPrice(
          Number(calculatedPrice) -
            (Number(calculatedPrice) * Number(selectedCoupon?.value)) / 100
        );
      } else {
        setoverAllPrice(calculatedPrice);
      }
    }
  };
  const handleSelectCoupon = () => {
    // console.log(selectedCoupon1);
    setSelectedCoupon(selectedCoupon1);
    handleCloseCoupon();
    if (selectedCoupon1?.type === "fixed") {
      setoverAllPrice(Number(mainPrice) - Number(selectedCoupon1?.value));
    } else {
      setoverAllPrice(
        Number(mainPrice) -
          (Number(mainPrice) * Number(selectedCoupon1?.value)) / 100
      );
    }
  };
  const getDiscountText = (val) => {
    if (val.type == "percent") {
      return `EXTRA ${val.value} % Discount`;
    } else if (val.type == "fixed") {
      return `FLAT ${symbol || "₹"} ${val.value} Discount`;
    }
  };
  useEffect(() => {
    calculateOverallPrice();
  }, [location?.state]);

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
  }, [location?.state, showCoupon]);
  console.log(
    "ooooooo",
    location?.state,
    selectedCoupon1?.code || selectedCoupon?.code || ""
  );
  return (
    <Col md={5}>
      <h2 className="cart-heading">Order Summary</h2>
      {/* {location?.state?.map?.((item, index) => {
        return <OrderSummaryItem data={item} index={index} />;
      })} */}
      {location?.state?.buynow ? (
        <OrderSummaryItem data={location?.state} index={1} />
      ) : (
        location?.state?.map?.((item, index) => {
          return <OrderSummaryItem data={item} index={index} />;
        })
      )}
      {/* <OrderSummaryItem data={state} /> */}
      {/* <div className="gst-box">
        <input type="checkbox" onClick={handleShow} /> Use GST Invoice
      </div> */}
      <BillDetailsInfo
        data={location?.state}
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
        <div className="apply-coupens-main-right" onClick={handleShowCoupon}>
          <FontAwesomeIcon
            icon={faArrowRightLong}
            size="2x"
            className="apply-arrow-icon"
          />
        </div>

        <Modal
          show={showCoupon}
          onHide={handleCloseCoupon}
          className="coupon-modal-main"
        >
          <div className="modal-inputs-coupon">
            <h2>Coupons for you</h2>
            <div className="entercode">
              <input
                value={selectedCoupon1?.code || selectedCoupon?.code || ""}
                type="text"
                placeholder="ENTER COUPON CODE "
              />
              <button onClick={handleSelectCoupon} className="button">
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

      <h2 className="cart-heading mt-30">Payment options</h2>
      <PaymentOptions
        checkedTermConditions={checkedTermConditions}
        setCheckedTermConditions={setCheckedTermConditions}
        paymentOptions={paymentOptions}
        setPaymentOptions={setPaymentOptions}
        payOption={payOption}
        setPayOption={setPayOption}
        payMethod={payMethod}
        setPayMethod={setPayMethod}
      />
      {availabilityError && (
        <div style={{ paddingBottom: "8px", fontSize: "14px", color: "red" }}>
          {availabilityError}
        </div>
      )}
      <div className="proceed-button" onClick={() => ProceedToPayment()}>
        {isSubmit ? <Loader size={25} /> : "Proceed to checkout"}
      </div>

      <Modal show={show} onHide={handleClose} className="gst-modal-main">
        <Modal.Header closeButton>
          <h2>Your GST Information</h2>
        </Modal.Header>
        <Modal.Body className="modal-inputs">
          <input type="text" placeholder="GSTIN" />
          <input type="text" placeholder="Business Name" />
          <p>
            {" "}
            <FontAwesomeIcon
              icon={faInfoCircle}
              size="2x"
              className="info-icon"
            />{" "}
            Incorrect GSTIN details will lead to order cancellation
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button " onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </Col>
  );
};

export default OrderSummary;
