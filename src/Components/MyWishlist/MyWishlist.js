import React, { useContext, useEffect, useRef, useState } from "react";
import Product from "../Common/Product/Product";
import { Col } from "react-bootstrap";
import "./MyWishlist.scss";
import AlsoLike from "../DetailPage/AlsoLike";
import styled from "styled-components";
import Loader from "../Loading/Loader";
import { useQuery } from "react-query";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import { FilterContext } from "../../context/FilterContext";
import AuthContext from "../../context/AuthContext";

const AlsoLikeProducts = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 50px;
  /* justify-content: space-between; */
`;

const MyWishlist = () => {
  const { country_code } = useContext(FilterContext);
  const [updateState, setUpdateState] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const queryRef = useRef();
  const fetchCategoriesData = async ({ queryKey }) => {
    const [, country_code] = queryKey;
    // console.log("country_code11", country_code);
    let apiUrl = `${
      environmentVar?.apiUrl
    }/api/product/fetch_all_product?country_code=${country_code || "IN"}`;

    const config = {
      method: "post",
      url: apiUrl,
    };

    const response = await axios(config);

    return response?.data?.data;
  };

  const { data, isLoading, error, refetch } = useQuery(
    ["getwishlisteddata", country_code],
    fetchCategoriesData
  );

  useEffect(() => {
    queryRef.current = {
      queryKey: ["products", country_code],
    };
  }, [country_code]);

  const handleRefetch = () => {
    refetch(queryRef.current);
  };
  useEffect(() => {
    handleRefetch();
  }, [updateState, userInfo]);

  if (isLoading) return <Loader />;

  if (error) {
    return <h3>Data not Available</h3>;
  }

  if (!data?.length) {
    return <h3>Data not Available</h3>;
  }
  return (
    <>
      <Col md={9}>
        <div className="my-wishlist-main">
          <h1>My Wishlist</h1>
          <div className="wish-products">
            {data.filter((item) => item.isWishlisted).length > 0 ? (
              data
                .filter((item) => item.isWishlisted)
                .map((item, index) => (
                  <Product
                    key={index}
                    item={item}
                    index={index}
                    setUpdateState={setUpdateState}
                    updateState={updateState}
                    width="calc(33.33% - 10px)"
                  />
                ))
            ) : (
              <h2>Data not available</h2>
            )}
            {/* <Product width="calc(33.33% - 10px)" />
            <Product width="calc(33.33% - 10px)" />
            <Product width="calc(33.33% - 10px)" /> */}
          </div>
        </div>
        {/* <div className="also-like-main">
          <h2>You Might Also Like</h2>
          <AlsoLikeProducts>
            <Product width="calc(33.33% - 10px)" />
            <Product width="calc(33.33% - 10px)" />
            <Product width="calc(33.33% - 10px)" />
            <Product width="calc(33.33% - 10px)" />
            <Product width="calc(33.33% - 10px)" />
          </AlsoLikeProducts>
        </div> */}
      </Col>
    </>
  );
};

export default MyWishlist;
