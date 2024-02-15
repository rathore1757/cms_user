import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import frameWidthImg from "../../Images/frame-width-img.webp";
import lenseWidthImg from "../../Images/lenses-width-img.webp";
import lenseheightImg from "../../Images/lenses-height-img.webp";
import bridgewidthImg from "../../Images/bridge-width-img.webp";
import templelenghtImg from "../../Images/temple-length-img.webp";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { FilterContext } from "../../context/FilterContext";

const FrameProperty = () => {
  const { id } = useParams();
  const { country_code } = useContext(FilterContext);
  const frameImages = [
    frameWidthImg,
    lenseWidthImg,
    lenseheightImg,
    bridgewidthImg,
    templelenghtImg,
  ];
  const [uiFrameData, setUiFrameData] = useState(null);

  const fetchCategoriesData = async ({ queryKey }) => {
    const [, id, country_code] = queryKey;
    let apiUrl = `${
      environmentVar?.apiUrl
    }/api/product/fetch_product_by_id?id=${id}&country_code=${
      country_code || "IN"
    }`;

    const config = {
      method: "get",
      url: apiUrl,
    };

    const response = await axios(config);
    return response?.data?.data;
  };

  const {
    data: productData,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ["productbyidinframeproperty", id, country_code],
    fetchCategoriesData
  );

  const getUIFrameData = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/admin/ui_inner_section/get_ui_frame_config`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data.data);
        setUiFrameData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUIFrameData();
  }, []);

  console.log("data111", productData);

  return (
    <>
      <Container>
        <div className="frame-property-header">
          <h2>Product Description</h2>
          <h3>{productData?.[0]?.description}</h3>
          <ul>
            <li>
              SKU: <span>{productData?.[0]?.sku}</span>
            </li>
            <li>
              Shape: <span>{productData?.[0]?.shapeobj?.value}</span>
            </li>
            <li>
              Size: <span>{productData?.[0]?.sizeData?.[0]?.value}</span>
            </li>
            <li>
              Materials: <span>{productData?.[0]?.materialData?.value}</span>
            </li>
            <li>
              Weight: <span>{productData?.[0]?.weightData?.value} g</span>
            </li>
            <li>
              Gender:{" "}
              <span>
                {productData?.[0]?.genderDataArr
                  ?.map((item) => item?.value)
                  .join(", ")}
              </span>
            </li>
            <li>
              Frame Width: <span>{productData?.[0]?.frame_width} mm</span>
            </li>
            <li>
              Lens Height: <span>{productData?.[0]?.lens_height} mm</span>
            </li>
            <li>
              Lens Width : <span>{productData?.[0]?.lens_width} mm</span>
            </li>
            <li>
              Bridge Width: <span>{productData?.[0]?.bridge_width} mm</span>
            </li>
            <li>
              Temple Length: <span>{productData?.[0]?.temple_length} mm</span>
            </li>
          </ul>
        </div>
        <div className="frame-property-boxes">
          {uiFrameData &&
            uiFrameData.map((val, index) => (
              <div className="frame-property-box">
                <h2>140mm</h2>
                <img src={frameImages[index]} />
                <div className="frame-name">{val?.heading}</div>
                <div className="frame-para">{val?.description}</div>
              </div>
            ))}
        </div>
      </Container>
    </>
  );
};

export default FrameProperty;
