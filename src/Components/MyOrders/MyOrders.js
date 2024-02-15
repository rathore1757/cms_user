import React, { useEffect, useState } from "react";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import { Tabs, Tab } from "react-bootstrap";
import SingleOrder from "./SingleOrder";
import { useQuery } from "react-query";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import { useNavigate } from "react-router-dom";

const MyOrders = ({ col99 }) => {
  const [key, setKey] = useState("order");
  const [updateState, setUpdateState] = useState(false);
  const navigate = useNavigate();
  const fetchAllorders = async () => {
    // console.log("country_code11", country_code);
    let apiUrl = `${environmentVar?.apiUrl}/api/order/get_order`;

    const config = {
      method: "get",
      url: apiUrl,
      withCredentials: true,
    };

    const response = await axios(config);
    console.log(response?.data, "response?.data");
    return response?.data;
  };

  const {
    data: obj,
    isLoading,
    error,
    refetch,
  } = useQuery("getorderslist", fetchAllorders);

  const handleRefetch = () => {
    refetch();
  };

  // Use useEffect to refetch when the state changes
  useEffect(() => {
    handleRefetch();
  }, [updateState]);

  if (isLoading) return <>Loader</>;

  if (error) {
    return <h3>Data not Available</h3>;
  }

  // if (!data?.length) {
  //   return <h3>Data not available</h3>;
  // }

  return (
    <>
      <Col md={{ col99 }}>
        <div className="my-wishlist-main">
          <h1>My Orders</h1>
          <div className="coupens">
            <Tabs
              id="controlled-tabs"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="order" title="All Order">
                {obj?.allData.length ? (
                  obj?.allData?.map?.((item, index) => {
                    return (
                      <SingleOrder
                        item={item}
                        index={index}
                        updateState={updateState}
                        setUpdateState={setUpdateState}
                      />
                    );
                  })
                ) : (
                  <h2>No data Found </h2>
                )}
              </Tab>
              <Tab eventKey="delivered" title="Delivered">
                {Object.keys(obj?.obj).length !== 0 ? (
                  obj?.obj?.delivered?.map((item, index) => {
                    return (
                      <SingleOrder
                        item={item}
                        index={index}
                        updateState={updateState}
                        setUpdateState={setUpdateState}
                      />
                    );
                  })
                ) : (
                  <h2>No data Found</h2>
                )}
              </Tab>

              <Tab eventKey="cancelled" title="Cancelled">
                {Object.keys(obj?.obj).length !== 0 ? (
                  obj?.obj?.cancelled?.map((item, index) => {
                    return (
                      <SingleOrder
                        item={item}
                        index={index}
                        updateState={updateState}
                        setUpdateState={setUpdateState}
                      />
                    );
                  })
                ) : (
                  <h2>No data Found</h2>
                )}
              </Tab>
            </Tabs>
          </div>
        </div>
      </Col>
    </>
  );
};

export default MyOrders;
