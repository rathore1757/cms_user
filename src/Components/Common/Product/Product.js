import React, { useContext } from "react";
import "./product.scss";
import product from "../../../Images/product1.webp";
import { faHeart as faheart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { environmentVar } from "../../../config/environmentVar";
import axios from "axios";
import { FilterContext } from "../../../context/FilterContext";
import { Col } from "react-bootstrap";
import AuthContext from "../../../context/AuthContext";
import { CartDetailContext } from "../../../context/CartDetailContext";
import { toast } from "react-toastify";

const ProductMain = styled.div`
  width: ${(props) => (props.width ? props.width : "32%")};
  padding: 20px;
  transition: 0.5s;
  border-radius: 5px;
  margin: 0 0.6% 70px;
  border: 1px solid #00000012;
  @media screen and (max-width: 1700px) {
    margin: 0 0.6% 50px;
  }
  @media screen and (max-width: 1400px) {
    margin: 0 0.6% 30px;
  }
  @media screen and (max-width: 992px) {
    margin: 0 0.5% 30px;
    width: 49%;
  }
  @media screen and (max-width: 576px) {
    margin: 0 0 30px;
    width: 100%;
    background-color: #fff;
  }
  &:hover {
    box-shadow: 0px 0px 15px 10px #00000012;
  }
`;

const ColorswithText = styled.div`
  display: flex;
  align-items: center;
  ul {
    display: flex;
    margin: 0;
    li {
      width: 15px;
      height: 15px;

      border-radius: 50%;
      margin-left: 8px;
    }
  }
`;

const Product = (props) => {
  const { isAuth } = useContext(AuthContext);
  const { symbol } = useContext(FilterContext);
  const { homeUpdate, setHomeUpdate } = useContext(CartDetailContext);
  const navigate = useNavigate(null);

  const wishlistedButton = () => {
    let config = {
      method: "post",
      url: `${environmentVar?.apiUrl}/api/wishlist/add_to_wishlist?product_id=${props?.item?.id}`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        props?.setUpdateState(!props?.updateState);
        if (response.status === 201) {
          toast.success("Added to your Wishlist", {
            autoClose: 2000,
          });
        } else {
          toast.success("Removed from your Wishlist", {
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let totalDiscount = Number(
    props?.item?.variants?.[0]?.variant_price_details?.[0]?.discount
  );
  let totalTax = Number(
    props?.item?.variants?.[0]?.variant_price_details?.[0]?.tax
  );
  let totalPrice = Number(
    props?.item?.variants?.[0]?.variant_price_details?.[0]?.price
  );

  console.log(props?.item?.colorData);
  return (
    <>
      <ProductMain width={props.width}>
        <div
          className="product-image-fix-box"
          onClick={() => {
            navigate(`/detailpage/${props?.item?.id}`);
            setHomeUpdate(!homeUpdate);
          }}
        >
          <img
            className=""
            src={`${environmentVar?.apiUrl}/uploads/${
              props?.item?.variants?.[0]?.thumbnail_url?.replace(/"/g, "") ||
              props?.item?.thumbnail_img?.replace(/"/g, "")
            }`}
          />
        </div>
        <div className="product-details-main">
          <div className="product-left">
            <div className="product-name">
              {props?.item?.variants?.[0]?.variant_name}
            </div>
            <div className="product-price">
              {symbol || "₹"}{" "}
              {Number(totalPrice - (totalDiscount * totalPrice) / 100)?.toFixed(
                2
              )}
              <span>
                {symbol || "₹"}{" "}
                {Number(
                  props?.item?.variants?.[0]?.variant_price_details?.[0]?.price
                )?.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="product-right">
            <div
              className="heart-icon"
              // style={{ color: props?.item?.isWishlisted ? "red" : "white" }}
              onClick={() => {
                wishlistedButton();
              }}
            >
              <FontAwesomeIcon
                // icon={faHeart}
                icon={props?.item?.isWishlisted ? faHeart : faheart}
                size="2x"
                className="font-icon"
                style={{
                  color: props?.item?.isWishlisted ? "#ff4343" : "#032140",
                }}
                // style={{ color: props?.item?.isWishlisted ? "#ff4343" : "#032140" }}
              />
            </div>
            <ColorswithText>
              <ul>
                {props?.item?.colorData?.map((colorItem, colorIndex) => {
                  return (
                    <li
                      key={colorIndex}
                      style={{ backgroundColor: colorItem?.value }}
                    ></li>
                  );
                })}
              </ul>
              {/* <div className="color">Color</div> */}
            </ColorswithText>
          </div>
        </div>
        <div className="product-buttons">
          <button
            onClick={() => navigate("/tryon")}
            className="product-light-white-button w-48"
          >
            Try On
          </button>
          <button
            className="product-button w-48"
            onClick={() => {
              navigate(`/detailpage/${props?.item?.id}`);
              setHomeUpdate(!homeUpdate);
            }}
          >
            Buy Now
          </button>
        </div>
      </ProductMain>
    </>
  );
};

export default Product;
