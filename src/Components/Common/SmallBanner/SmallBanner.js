import React from "react";
import Container from "react-bootstrap/Container";
import "./SmallBanner.scss";
import styled from "styled-components";
import { environmentVar } from "../../../config/environmentVar";

const SmallBannerMain = styled.div`
  height: 350px;
  display: flex;
  align-items: center;
  position: relative;
  background-color: ${(props) => (props.color ? props.color : "antiquewhite")};
  @media screen and (max-width: 576px) {
        background-color: #f2f6f4;
      }
  h2 {
    color: #032140;
    font-size: 48px;
    font-weight: 700;
    @media screen and (max-width: 576px) {
        font-size: 24px;
      }
  }
  h3 {
    color: #4d4d4d;
    font-size: 24px;
    font-weight: 400;
    @media screen and (max-width: 576px) {
        display: none;
      }
  }
  @media screen and (max-width: 576px) {
      height: 55px;
    }
`;

const SmallBanner = ({
  smallBannerHead,
  smallBannerPara,
  smallBannerImage,
  smallBannerColor,
}) => {
  return (
    <>
      <SmallBannerMain
        color={smallBannerColor ? smallBannerColor : "antiquewhite"}
      >
        <Container>
          <div className="small-hero-text-img-main">
            <div className="small-hero-text">
              <h2>{smallBannerHead}</h2>
              <h3>{smallBannerPara}</h3>
            </div>
            <div className="small-hero-img">
              <img
                src={`${environmentVar?.apiUrl}/uploads/ui/${smallBannerImage}`}
                />
            </div>
          </div>
        </Container>
      </SmallBannerMain>
    </>
  );
};

export default SmallBanner;
