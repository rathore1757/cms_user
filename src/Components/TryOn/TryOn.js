import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import GirlMobile from "../../Images/girl-mobile.webp";
import "./TryOn.scss";
import { useNavigate } from "react-router-dom";
import { environmentVar } from "../../config/environmentVar";

const TryOn = ({ landingPageData }) => {
  const navigate = useNavigate();
  return (
    <>
      {landingPageData && landingPageData.length > 0 ? (
        <>
          {" "}
          <div className="tryon-main">
            <Container className="tryon">
              <Row className="flex-aligncenter">
                {/* <Col md={6} className="offset-md-2"> */}
                <Col md={6}>
                  <div>
                    <h2>{landingPageData[2]?.module_heading}</h2>
                    <h5>{landingPageData[2]?.module_description}</h5>
                    <button
                      onClick={() => navigate(`/${landingPageData[2]?.slug}`)}
                      className="button"
                    >
                      3D TRY ON
                    </button>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="tryon-sideimg">
                    {" "}
                    <img
                      src={`${environmentVar?.apiUrl}/uploads/ui/${landingPageData[2]?.image}`}
                      alt=""
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default TryOn;
