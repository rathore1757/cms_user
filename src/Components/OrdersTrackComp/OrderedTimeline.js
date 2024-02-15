import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { environmentVar } from "../../config/environmentVar";
import AuthContext from "./../../context/AuthContext";

const Status = styled.div`
  color: ${(props) => (props.active ? "#089981" : "lightgrey")};
  font-size: 12px;
  font-weight: 500;
  @media screen and (max-width: 576px) {
    width: 100px;
    text-align: right;
    padding-right: 10px;
  }
`;

const CircleTickStart = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  // background-color: red;
  border-radius: 50px;
  margin: 10px 0;
  background-color: ${(props) => (props.active ? "#089981" : "lightgrey")};
  display: flex;
  align-items: center;
`;
const CircleTick = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  // background-color: red;
  border-radius: 50px;
  margin: 10px 0;
  background-color: ${(props) => (props.active ? "#089981" : "lightgrey")};
  display: flex;
  align-items: center;
  @media screen and (max-width: 576px) {
    /* width: 100px; */
    text-align: right;
    padding-right: 10px;
  }
  &:before {
    content: "";
    position: absolute;
    right: 24px;
    width: 152px;
    height: 5px;
    background-color: ${(props) => (props.active ? "#089981" : "lightgrey")};
    @media screen and (max-width: 1700px) {
        width: 132px;
      }
    @media screen and (max-width: 1400px) {
        width: 112px;
      }
    @media screen and (max-width: 1200px) {
        width: 92px;
      }
    @media screen and (max-width: 992px) {
        width: 72px;
      }
    @media screen and (max-width: 768px) {
        width: 92px;
      }
    @media screen and (max-width: 576px) {
        width: 5px;
        height: 60px;
        right: 9px;
        top: -60px;
      }
  }
`;
const CircleTickDelivered = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  // background-color: #089981;
  background-color: ${(props) => (props.active ? "#089981" : "lightgrey")};
  border-radius: 50px;
  margin: 10px 0;
  display: flex;
  align-items: center;
`;
const DateComp = styled.div`
  font-size: 12px;
  color: #4d4d4d;
  font-weight: 500;
  @media screen and (max-width: 576px) {
    padding-left: 10px;
  }
`;

const OrderedTimeline = ({ responseData }) => {
  // let createdDate = responseData !== null && responseData?.created_at;
  // let orderedDate = new Date(createdDate).toLocaleString("en-IN", {
  //   timeZone: "Asia/Kolkata",
  //   day: "numeric",
  //   month: "numeric",
  //   year: "numeric",
  //   hour: "numeric",
  //   minute: "numeric",
  //   hour12: false,
  // });

  // console.log(orderedDate);
  const formatDate = (dateString) => {
    if (dateString == null || dateString == undefined || dateString == "") {
      return "";
    }
    // try {
    // const options = {
    //   timeZone: "Asia/Kolkata",
    //   day: "2-digit",
    //   month: "2-digit",
    //   year: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   hour12: false,
    // };
    // console.log("dateString", dateString);
    // const formattedDate = new Date("2024-01-19T10:23:26.000Z").toLocaleString(
    //   "en-IN",
    //   options
    // );
    return dateString.split("T")[0]; // Remove the comma after the year
    // }
    // catch (error) {
    //   return "Invalid Date";
    // }
  };
  // const isDateAfter = () => {
  //   const date = new Date().toISOString().split("T")[0];
  //   console.log(date);
  // };
  // isDateAfter();
  return (
    <>
      {responseData !== null && (
        <div className="ordered-timeline-main">
          <div className="timeline-details">
            <Status 
            active={
              responseData?.status === "new" ||
              responseData?.status === "processing" ||
              responseData?.status === "outfordelivery" ||
              responseData?.status === "delivered"
            }
            >Order Confirmed</Status>

            <CircleTickStart
              active={
                responseData?.status === "new" ||
                responseData?.status === "processing" ||
                responseData?.status === "outfordelivery" ||
                responseData?.status === "delivered"
              }
            ></CircleTickStart>

            <DateComp>
              {formatDate(responseData?.created_at)}
              {/* Mon, 15th Dec */}
            </DateComp>
          </div>
          <div className="timeline-details">
            <Status
            active={
              responseData?.status === "processing" ||
              responseData?.status === "outfordelivery" ||
              responseData?.status === "delivered"
            }
            >Shipped</Status>

            <CircleTick
              active={
                responseData?.status === "processing" ||
                responseData?.status === "outfordelivery" ||
                responseData?.status === "delivered"
              }
            ></CircleTick>

            <DateComp>{formatDate(responseData?.shipping_date)}</DateComp>
          </div>
          <div className="timeline-details">
            <Status
            active={
              responseData?.status === "outfordelivery" ||
              responseData?.status === "delivered"
            }
            >Out for Delivery</Status>

            <CircleTick
              active={
                responseData?.status === "outfordelivery" ||
                responseData?.status === "delivered"
              }
            ></CircleTick>

            <DateComp>
              {formatDate(responseData?.out_for_delivery_date)}
            </DateComp>
          </div>
          <div className="timeline-details">
            <Status
            active={responseData?.status === "delivered"}
            >Delivered</Status>

            <CircleTick
              active={responseData?.status === "delivered"}
            ></CircleTick>
            <DateComp>{formatDate(responseData?.delivery_date)}</DateComp>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderedTimeline;
