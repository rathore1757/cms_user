import React, { useContext, useEffect, useState } from "react";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faheart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import variantImg from "../../Images/variant-img.png";
// import variantImg2 from "../../Images/variant-img2.png";
// import variantImg3 from "../../Images/variant-img3.png";
// import variantImg4 from "../../Images/variant-img4.png";
// import variantImg5 from "../../Images/variant-img5.png";
import { useNavigate } from "react-router-dom";
import { FilterContext } from "../../context/FilterContext";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductDetailContext } from "../../context/ProductDetailContext";
import { useParams, useLocation } from "react-router-dom";

const DetailPageDetails = ({
  data,
  otherProduct,
  reviewData,
  handleScroll,
  updateState,
  setUpdatedState,
}) => {
  const navigate = useNavigate(null);
  const { symbol, updateShapeIds } = useContext(FilterContext);
  const { userInfo, isAuth } = useContext(AuthContext);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [matchedColor, setMatchedColor] = useState(null);
  const [matchedSize, setMatchedSize] = useState(null);
  const { urlPath } = useParams();
  const {
    variantDataInContext,
    setVariantDataInContext,
    productDataInContext,
    setProductDataInContext,
  } = useContext(ProductDetailContext);
  const [variantData, setVariantdata] = useState(data?.variants?.[0]);
  // data?.colorData?.find(
  //   (item) => data?.variants?.[0]?.color_id === Number(item?.color_id)
  // )
  const wishlistedButton = () => {
    let config = {
      method: "post",
      url: `${environmentVar?.apiUrl}/api/wishlist/add_to_wishlist?product_id=${data?.id}`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setUpdatedState(!updateState);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || error?.message, {
          autoClose: 2000,
        });
      });
  };
  const [totalDiscount, setTotalDiscount] = useState(
    Number(data?.variants?.[0]?.variant_price_details?.[0]?.discount)
  );
  const [totalPrice, setTotalPrice] = useState(
    Number(data?.variants?.[0]?.variant_price_details?.[0]?.price)
  );

  // console.log("propsdata", data, otherProduct);
  // let totalDiscount = Number(
  //   data?.variants?.[0]?.variant_price_details?.[0]?.discount
  // );
  // let totalTax = Number(data?.variants?.[0]?.variant_price_details?.[0]?.tax);
  // let totalPrice = Number(
  //   data?.variants?.[0]?.variant_price_details?.[0]?.price
  // );
  const location = useLocation();

  // Access the entire URL path
  const path = location.pathname;
  console.log(path, "path");
  const addToCart = (variantDataInContext) => {
    // navigate("/cart");
    // console.log(userInfo, "userInfo", variantDataInContext, itemQuantity);
    if (isAuth) {
      let dataforapi = {
        product_id: data?.id,
        product_variant_id: variantDataInContext?.variant_id,
        quantity: itemQuantity,
      };

      let config = {
        method: "post",
        url: `${environmentVar?.apiUrl}/api/cart/add_to_cart`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
        data: dataforapi,
      };

      axios
        .request(config)
        .then((response) => {
          // console.log(response.data);
          toast.success("Product Added to cart", {
            autoClose: 2000,
          });
          navigate("/cart");
        })
        .catch((error) => {
          // console.log(error);
          toast.error(error?.response?.data?.message || error?.message, {
            autoClose: 2000,
          });
        });
    } else {
      navigate("/login", { state: path?.replace("/", "", 1) });
    }
  };

  const BuyNow = (variantDataInContext, quantity) => {
    if (isAuth) {
      console.log("variantDataInContext", variantDataInContext);
      navigate("/checkout", {
        state: {
          ...variantDataInContext,
          buynow: "buynow",
          quantity,
          title: data.title,
        },
      });
    } else {
      navigate("/login", { state: path?.replace("/", "", 1) });
    }
  };

  const handleClickUrl = (item) => {
    const newUrl = `/detailpage/${item?.id}`;
    setProductDataInContext(item);
    // console.log("3636363", item);
    updateShapeIds([item?.shape_id]);
    setTotalDiscount(
      Number(item?.variants?.[0]?.variant_price_details?.[0]?.discount)
    );
    setTotalPrice(
      Number(item?.variants?.[0]?.variant_price_details?.[0]?.price)
    );
    navigate(newUrl);
  };
  const clickedChangesEvent = (item) => {
    let matchedCount = data?.variants?.find(
      (innerItem) => innerItem?.color_id === Number(item?.color_id)
    );

    setMatchedColor(matchedCount);
    // setVariantdata(matchedCount);
    setTotalDiscount(
      Number(matchedCount?.variant_price_details?.[0]?.discount)
    );
    setTotalPrice(Number(matchedCount?.variant_price_details?.[0]?.price));
    setVariantDataInContext(matchedCount);
    console.log("matchedData", matchedCount, data);
  };
  const clickedChangesEventSize = (item) => {
    let matchedCount = data?.variants?.find(
      (innerItem) => innerItem?.variant_id === item?.variant_id
    );

    setMatchedSize(matchedCount);
    // setVariantdata(matchedCount);
    setTotalDiscount(
      Number(matchedCount?.variant_price_details?.[0]?.discount)
    );
    setTotalPrice(Number(matchedCount?.variant_price_details?.[0]?.price));
    setVariantDataInContext(matchedCount);
    // console.log("matchedData", item, data?.variants);
  };

  useEffect(() => {
    if (data?.variants && data?.variants.length > 0 && data?.colorData) {
      let initialMatchedColor = data.variants.find(
        (variant) => variant?.color_id === Number(data.variants[0]?.color_id)
      );
      setMatchedColor(initialMatchedColor);
    }
    if (data?.variants && data?.variants.length > 0 && data?.sizeData) {
      let initialMatchedSize = data.variants.find(
        (variant) => variant?.size_id === Number(data.variants[0]?.size_id)
      );
      setMatchedSize(initialMatchedSize);
    }
    setVariantDataInContext(data?.variants?.[0]);
    setProductDataInContext(data);
  }, [data]);

  const decrementClick = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  };
  const increamentClick = () => {
    if (
      itemQuantity <
      Number(variantDataInContext?.variant_price_details?.[0]?.stock)
    ) {
      setItemQuantity(itemQuantity + 1);
    }

    // itemQuantity <=
    // Number(variantDataInContext?.variant_price_details?.[0]?.stock)
    //   ? setItemQuantity(itemQuantity + 1)
    //   : alert("Stock Is not availiable");
  };
  console.log(
    "variantDataInContext",
    data,
    variantDataInContext?.variant_price_details?.[0]?.stock,
    variantDataInContext?.sku
  );
  return (
    <>
      <div className="detailpage-detail-main">
        <div className="detailpage-name-review-wish">
          <div className="detailpage-name-review">
            <div className="detail-name">
              {data?.title}{" "}
              <span onClick={() => navigate("/tryon")}>Try On</span>
            </div>
            <div className="detail-review">
              <div className="flex-aligncenter" onClick={() => handleScroll(1)}>
                {reviewData?.data?.overallRating && (
                  <ul>
                    {reviewData?.data?.overallRating}{" "}
                    <li>
                      <FontAwesomeIcon
                        icon={faStar}
                        size="2x"
                        className="star-icon-1"
                      />
                    </li>
                  </ul>
                )}
                {reviewData?.data?.fetchData?.length} reviews |{" "}
              </div>
              <span>
                {variantDataInContext?.variant_price_details?.[0]?.stock > 0 ? (
                  <span style={{ color: "green" }}>In Stock</span>
                ) : (
                  <span style={{ color: "red" }}>Out of Stock</span>
                )}{" "}
              </span>
            </div>
          </div>
          <div className="detail-wish">
            <FontAwesomeIcon
              onClick={wishlistedButton}
              icon={data?.isWishlisted ? faHeart : faheart}
              size="2x"
              className="fas line-heart-icon"
              style={{ color: data?.isWishlisted ? "#ff4343" : "#032140" }}
            />
          </div>
        </div>

        <div className="detailpage-price">
          {symbol || "₹"}{" "}
          {Number(totalPrice - (totalDiscount * totalPrice) / 100)?.toFixed(2)}{" "}
          {/* <span>Vuezen coupon</span> */}
        </div>

        <div className="detailpage-para">{data?.description} </div>

        <div className="detailpage-colors-main">
          <h4>Colours:</h4>
          <div className="detailpage-colors">
            <ul>
              {/* {data?.colorData?.map((item, index) => {
                console.log(matchedColor);
                return (
                  <li
                    style={{
                      backgroundColor: item?.value,
                      border: matchedColor && "4px solid black",
                    }}
                    key={index}
                    onClick={() => clickedChangesEvent(item)}
                  ></li>
                );
              })} */}
              {data?.colorData?.map((item, index) => {
                return (
                  <li
                    style={{
                      backgroundColor: item?.value,
                      border:
                        matchedColor?.color_id === Number(item?.color_id)
                          ? "3px solid #000"
                          : "none",
                    }}
                    key={index}
                    onClick={() => clickedChangesEvent(item)}
                  ></li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="detailpage-size-quantity">
          <div className="detailpage-size-main">
            <h4>Size:</h4>
            <div className="detailpage-sizes">
              <ul>
                <li>
                  {Number(data?.size_id) === 1
                    ? "Small"
                    : Number(data?.size_id) === 2
                    ? "Medium"
                    : Number(data?.size_id) === 3 && "Wide"}
                </li>
                {/* {data?.sizeData?.map((outerItem, index) => {
                  // Check if the conditions are met for opacity and cursor
                  const isClickable =
                    variantDataInContext?.color_id &&
                    !data?.variants?.some(
                      (item) =>
                        item?.color_id === variantDataInContext?.color_id &&
                        item?.size_id === Number(outerItem?.size_id)
                    );

                  return (
                    <li
                      key={index}
                      onClick={() => {
                        if (isClickable) {
                          const clickedItem = data?.variants?.find(
                            (item) =>
                              Number(item?.color_id) ===
                                Number(variantDataInContext?.color_id) &&
                              Number(item?.size_id) ===
                                Number(outerItem?.size_id)
                          );
                          clickedChangesEventSize(clickedItem);
                        }
                      }}
                      style={{
                        opacity: isClickable ? 0.5 : 1,
                        // cursor: isClickable ? "not-allowed" : "pointer",
                        pointerEvents: isClickable ? "none" : "auto",
                      }}
                    >
                      {Number(outerItem?.size_id) === 1 && "Small"}
                      {Number(outerItem?.size_id) === 2 && "Medium"}
                      {Number(outerItem?.size_id) === 3 && "Wide"}
                    </li>
                  );
                })} */}
              </ul>

              {/* <ul>
                {data?.sizeData?.map((item, index) => {
                  return (
                    <li
                      key={index}
                      style={{
                        border:
                          matchedSize?.size_id === Number(item?.size_id)
                            ? "4px solid black"
                            : "none",
                      }}
                      onClick={() => clickedChangesEventSize(item)}
                    >
                      {item?.size_id === "1" && "S"}
                      {item?.size_id === "2" && "M"}
                      {item?.size_id === "3" && "W"}
                    </li>
                  );
                })}
              </ul> */}
            </div>
          </div>
          <div className="detailpage-quantity-main">
            <h4>Quantity:</h4>
            <div className="detailpage-quantity-numbers">
              <ul>
                {/* {console.log("itemQuantity", itemQuantity)} */}
                <li
                  onClick={() => decrementClick()}
                  style={{ opacity: itemQuantity <= 1 ? 0.5 : 1 }}
                >
                  {" "}
                  -{" "}
                </li>
                <li style={{ cursor: "initial" }}> {itemQuantity} </li>
                <li
                  onClick={() => increamentClick()}
                  style={{
                    opacity:
                      itemQuantity >=
                      Number(
                        variantDataInContext?.variant_price_details?.[0]?.stock
                      )
                        ? 0.5
                        : 1,
                  }}
                >
                  {" "}
                  +{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {Number(variantDataInContext?.variant_price_details?.[0]?.stock) > 0 ? (
          <div className="detailpage-buttons mt-30">
            <button
              className="product-button btn-detailpage mr-20"
              onClick={() => BuyNow(variantDataInContext, itemQuantity)}
            >
              Buy Now
            </button>
            <button
              className="product-light-white-button btn-detailpage"
              onClick={() => addToCart(variantDataInContext)}
            >
              Add to Cart
            </button>
          </div>
        ) : (
          <></>
        )}

        <div className="detailpage-variants">
          <h4>Similar Products</h4>
          <div className="flex-flexwrap">
            {otherProduct?.slice(0, 6)?.map((item, index) => {
              // console.log("item11", item);

              return (
                <div
                  className="detailpage-variant"
                  key={index}
                  onClick={() => handleClickUrl(item)}
                >
                  <img
                    src={`${environmentVar.apiUrl}/uploads/${item?.variants?.[0]?.thumbnail_url}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DetailPageDetails;
