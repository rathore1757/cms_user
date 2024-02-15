import React, { useContext, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import CartISingletem from "./CartISingletem";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import { FilterContext } from "../../context/FilterContext";
import { CartDetailContext } from "../../context/CartDetailContext";
import cartItemImg from "../../Images/cart-item-img.webp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const CartItems = ({ data, setData, status, setStatus }) => {
  const { symbol } = useContext(FilterContext);
  const updateData = (id, newQuantity) => {
    let newData = [...data];
    newData.forEach((val) => {
      if (val.id == id) {
        val.quantity = newQuantity;
      }
    });
    setData(newData);
  };
  const updateQuantity = (item, newQuantity) => {
    // console.log("item,", item?.variants?.[0]?.variant_id, newQuantity);
    const config = {
      method: "put",
      url: `${environmentVar?.apiUrl}/api/cart/update_product_in_cart`,
      withCredentials: true,
      data: {
        product_variant_id: item?.variants?.[0]?.variant_id?.toString(),
        quantity: newQuantity?.toString(),
      },
    };

    axios
      .request(config)
      .then((response) => {
        updateData(item?.id, newQuantity);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      updateQuantity(item, newQuantity);
    }
  };

  const incrementQuantity = (item) => {
    if (
      item?.quantity <
      Number(item?.variants?.[0]?.variant_price_details?.[0]?.stock)
    ) {
      const newQuantity = item.quantity + 1;
      updateQuantity(item, newQuantity);
    }
  };

  const RemoveItemFromCart = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        let config = {
          method: "delete",
          url: `${environmentVar?.apiUrl}/api/cart/delete_or_clear_cart?product_variant_id=${item?.variants?.[0]?.variant_id}`,
          withCredentials: true,
        };
        axios
          .request(config)
          .then((response) => {
            // console.log(response.data);
            setStatus(!status);
            toast.success("Product removed from cart", {
              autoClose: 2000,
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.message, {
              autoClose: 2000,
            });
          });
      }
    });
  };
  const clearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear cart",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        let config = {
          method: "delete",
          url: `${environmentVar?.apiUrl}/api/cart/delete_or_clear_cart?product_variant_id=all`,
          withCredentials: true,
        };

        axios
          .request(config)
          .then((response) => {
            // console.log(response.data);
            setStatus(!status);
            toast.success("Cart Cleared", { autoClose: 2000 });
          })
          .catch((error) => {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.message, {
              autoClose: 2000,
            });
          });
      }
    });
  };

  console.log("data.length", data?.length);
  return (
    <>
      <Col lg={8}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className="cart-heading">
            Cart (
            {data?.length === 1
              ? `${data?.length} Item`
              : `${data?.length} Items`}
            )
          </h1>
          {data?.length >= 1 ? (
            <div
              style={{ color: "green", cursor: "pointer" }}
              onClick={() => clearCart()}
            >
              Clear cart
            </div>
          ) : (
            ""
          )}
        </div>

        {data?.map((item, index) => {
          let totalDiscount = Number(
            item?.variants?.[0]?.variant_price_details?.[0]?.discount
          );
          let totalTax = Number(
            item?.variants?.[0]?.variant_price_details?.[0]?.tax
          );
          let totalPrice = Number(
            item?.variants?.[0]?.variant_price_details?.[0]?.price
          );
          let quantity = item?.quantity;
          return (
            <div className="cart-item-main" key={index}>
              <div className="cart-item-image">
                <img
                  src={`${environmentVar?.apiUrl}/uploads/${
                    item?.variants?.[0]?.thumbnail_url?.replace(/"/g, "") ||
                    item?.thumbnail_img?.replace(/"/g, "")
                  }`}
                />
              </div>
              <div className="cart-item-details">
                <p>{item?.product_title}</p>

                <div className="cart-item-price">
                  <h2>Final Price</h2>
                  <h3>
                    {symbol || "₹"}
                    {Number(
                      (totalPrice - (totalPrice * totalDiscount) / 100) *
                        quantity
                    )?.toFixed(2)}
                  </h3>
                </div>
                <div
                  className="cart-item-remove"
                  onClick={() => RemoveItemFromCart(item)}
                >
                  Remove
                </div>
                <div className="cart-item-price">
                  <div className="detailpage-quantity-numbers">
                    <ul>
                      <li
                        onClick={() => decrementQuantity(item)}
                        style={{ opacity: item?.quantity <= 1 ? 0.5 : 1 }}
                      >
                        {" "}
                        -{" "}
                      </li>
                      <li> {item?.quantity} </li>
                      <li
                        onClick={() => incrementQuantity(item)}
                        style={{
                          opacity:
                            item?.quantity >=
                            Number(
                              item?.variants?.[0]?.variant_price_details?.[0]
                                ?.stock
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
              <ToastContainer />
            </div>
          );
        })}
      </Col>
    </>
  );
};

export default CartItems;
