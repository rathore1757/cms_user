import React, { useEffect, useState } from "react";
import OrdersTrackDetailsSec from "../../Components/OrdersTrackComp/OrdersTrackDetailsSec";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import OrderedDetailTimeline from "../../Components/OrdersTrackComp/OrderedDetailTimeline";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { environmentVar } from "../../config/environmentVar";

const OrdersTrackMain = styled.div`
  background-color: #f9fafb;
`;

const OrdersTrack = () => {
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  const [responseData, setResponseData] = useState(null);
  const { id } = useParams();

  const getOrderTrack = () => {
    let config = {
      method: "get",
      url: `${environmentVar?.apiUrl}/api/order/get_track_order?order_id=${id}`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        setResponseData(response.data.data);
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error?.response?.data?.message || error?.message, {
          autoClose: 2000,
        });
      });
  };
  useEffect(() => {
    getOrderTrack();
  }, []);
  return (
    <>
      <OrdersTrackMain>
        <Container>
          <OrdersTrackDetailsSec responseData={responseData} />
          <OrderedDetailTimeline responseData={responseData} />
        </Container>
      </OrdersTrackMain>
    </>
  );
};

export default OrdersTrack;
