import React, { useContext, useEffect, useRef, useState } from "react";
import Product from "../../Common/Product/Product";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../../Loading/Loader";
import { environmentVar } from "../../../config/environmentVar";
import { FilterContext } from "../../../context/FilterContext";
import AuthContext from "../../../context/AuthContext";

const ProductsShowMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 576px) {
       padding: 0 20px;
       background-color: #f2f6f4;
    }
`;

const Products = () => {
  const { catid, genderid } = useParams();
  const { userInfo } = useContext(AuthContext);
  const {
    colorIds,
    shapeIds,
    materialIds,
    sizeIds,
    weightGroupIds,
    MinPricingIds,
    MaxPricingIds,
    selectedSort,
    currencyRate,
    country_code,
  } = useContext(FilterContext);

  const queryRef = useRef();
  const [updateState, setUpdateState] = useState(false);
  const fetchCategoriesData = async ({ queryKey }) => {
    const [
      ,
      catid,
      genderid,
      shapeIds,
      colorIds,
      materialIds,
      sizeIds,
      weightGroupIds,
      MinPricingIds,
      MaxPricingIds,
      selectedSort,
      currencyRate,
      country_code,
    ] = queryKey;
    // console.log("country_code11", shapeIds);
    let apiUrl = `${
      environmentVar?.apiUrl
    }/api/product/fetch_all_product?cat_id=${catid}&gender=${genderid}&currencyRate=${currencyRate}&sort=${selectedSort}&country_code=${
      country_code || "IN"
    }`;

    const data = {
      shape_id: shapeIds,
      color_id: colorIds,
      material_id: materialIds,
      size_id: sizeIds,
      weight_group_id: weightGroupIds,
      minPrice: MinPricingIds,
      maxPrice: MaxPricingIds,
    };
    console.log(data);

    const config = {
      method: "post",
      url: apiUrl,
      data: data,
    };

    const response = await axios(config);

    // console.log(response?.data?.data);
    return response?.data?.data;
  };

  const { data, isLoading, error, refetch } = useQuery(
    [
      "products",
      catid,
      genderid,
      shapeIds,
      colorIds,
      materialIds,
      sizeIds,
      weightGroupIds,
      MinPricingIds,
      MaxPricingIds,
      selectedSort,
      currencyRate,
      country_code,
    ],
    fetchCategoriesData
  );

  useEffect(() => {
    queryRef.current = {
      queryKey: [
        "products",
        catid,
        genderid,
        shapeIds,
        colorIds,
        materialIds,
        sizeIds,
        weightGroupIds,
        MinPricingIds,
        MaxPricingIds,
        selectedSort,
        currencyRate,
        country_code,
      ],
    };
  }, [
    catid,
    genderid,
    shapeIds,
    colorIds,
    materialIds,
    sizeIds,
    weightGroupIds,
    MinPricingIds,
    MaxPricingIds,
    selectedSort,
    currencyRate,
    country_code,
  ]);

  const handleRefetch = () => {
    refetch(queryRef.current);
  };
  useEffect(() => {
    handleRefetch();
  }, [updateState, userInfo]);

  // useEffect(() => {
  //   setUpdateState(!updateState);
  // }, []);

  if (isLoading) return <Loader />;

  if (error) {
    return <h3>Data not Available</h3>;
  }

  if (!data?.length) {
    return <h3>Data not Available</h3>;
  }

  return (
    <>
      <ProductsShowMain className="row">
        {data?.map((item, index) => {
          return (
            <Product
              item={item}
              index={index}
              setUpdateState={setUpdateState}
              updateState={updateState}
            />
          );
        })}
      </ProductsShowMain>
    </>
  );
};

export default Products;
