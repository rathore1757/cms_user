import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import "./Footer.scss";
import FootLogo from "../../../Images/vuezen-logo.webp";
import dropdown_icon from "../../../Images/dropdown_arrow.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faFacebookF,
  faInstagram,
  faLocationDot,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { CartDetailContext } from "../../../context/CartDetailContext";
import axios from "axios";

const Footer = ({ title }) => {
  const navigate = useNavigate(null);
  const { homeUpdate, setHomeUpdate } = useContext(CartDetailContext);
  const [cities, setCities] = useState(null);
  const [areas, setAreas] = useState(null);
  const [isArea, setIsArea] = useState(true);
  const getCities = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:2000/api/user/blog/feth_city",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log((response.data));
        setCities(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAreas = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:2000/api/user/blog/get_areas_by_city/61",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setCities(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const params = window.location.href.split("-").pop();
    console.log(params);
    if (params == "delhi") {
      setIsArea(true);
      getAreas();
    } else {
      setIsArea(false);
      getCities();
    }
  }, [title]);
  const [isOpenedCarousel, setIsOpenedCarousel] = useState(0);
  return (
    <>
      <div>
        <div className="footer-main">
          <Container>
            <div className="footer">
              {/* <div className="footer-col">
                <ul>
                  <li
                    onClick={() => {
                      navigate("/");
                      setHomeUpdate(!homeUpdate);
                    }}
                  >
                    {" "}
                    <img src={FootLogo} />{" "}
                  </li>
                  <li>
                    VUEZEN is the go-to locale for eyewear aficionados looking
                    for the closest thing to custom frames - made possible by
                    our philosophy of producing incredibly.
                  </li>
                  <li>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faXTwitter}
                        size="2x"
                        className="font-icon"
                      />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        size="2x"
                        className="font-icon"
                      />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        size="2x"
                        className="font-icon"
                      />
                    </a>
                  </li>
                </ul>
              </div> */}
              <div className="footer-col">
                {/* <h2
                  onClick={() => {
                    isOpenedCarousel == 1
                      ? setIsOpenedCarousel(0)
                      : setIsOpenedCarousel(1);
                  }}
                >
                  {title} <img src={dropdown_icon} className="only-mobile" />
                </h2> */}
                <ul
                  className={
                    isOpenedCarousel == 1
                      ? "footer-mobile-active"
                      : "footer-mobile"
                  }
                >
                  {cities &&
                    cities.length > 0 &&
                    cities.map((val, index) => {
                      if (index < 5) {
                        return (
                          <li
                            style={{ fontSize: "14px" }}
                            onClick={() =>
                              navigate(
                                `/${title.split(" ").join("-")}-in-${val?.city}`
                              )
                            }
                          >
                            {val?.city}
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
              <div className="footer-col">
                <ul
                  className={
                    isOpenedCarousel == 2
                      ? "footer-mobile-active"
                      : "footer-mobile"
                  }
                >
                  {cities &&
                    cities.length > 0 &&
                    cities.map((val, index) => {
                      if (index > 5 && index <= 10) {
                        return (
                          <li
                            style={{ fontSize: "14px" }}
                            onClick={() =>
                              navigate(
                                `/${title.split(" ").join("-")}-in-${val?.city}`
                              )
                            }
                          >
                            {val?.city}
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
              <div className="footer-col">
                {/* <h2
                  onClick={() => {
                    isOpenedCarousel == 3
                      ? setIsOpenedCarousel(0)
                      : setIsOpenedCarousel(3);
                  }}
                >
                  {title} <img src={dropdown_icon} className="only-mobile" />
                </h2> */}
                <ul
                  className={
                    isOpenedCarousel == 3
                      ? "footer-mobile-active"
                      : "footer-mobile"
                  }
                >
                  {cities &&
                    cities.length > 0 &&
                    cities.map((val, index) => {
                      if (index > 10 && index <= 15) {
                        return (
                          <div>
                            <FontAwesomeIcon
                              icon="fa-solid fa-location-dot"
                              className="font-icon"
                            />
                            <li
                              style={{ fontSize: "14px" }}
                              onClick={() =>
                                navigate(
                                  `/${title.split(" ").join("-")}-in-${
                                    val?.city
                                  }`
                                )
                              }
                            >
                              {val?.city}
                            </li>
                          </div>
                        );
                      }
                    })}
                </ul>
              </div>
              {/* <div className="footer-col">
                <h2
                  onClick={() => {
                    isOpenedCarousel == 4
                      ? setIsOpenedCarousel(0)
                      : setIsOpenedCarousel(4);
                  }}
                >
                  Need Help <img src={dropdown_icon} className="only-mobile" />
                </h2>
                <ul
                  className={
                    isOpenedCarousel == 4
                      ? "footer-mobile-active"
                      : "footer-mobile"
                  }
                >
                  <li>
                    <a onClick={() => navigate("/contact")}>Contact Us</a>
                  </li>
                  <li>info@vuezen.com</li>
                  <li>Call: +1 (302) 990-0619 </li>
                </ul>
              </div> */}
              <div className="footer-col">
                <ul
                  className={
                    isOpenedCarousel == 2
                      ? "footer-mobile-active"
                      : "footer-mobile"
                  }
                >
                  {cities &&
                    cities.length > 0 &&
                    cities.map((val, index) => {
                      if (index > 15 && index <= 20) {
                        return (
                          <li
                            style={{ fontSize: "14px" }}
                            onClick={() =>
                              navigate(
                                `/${title.split(" ").join("-")}-in-${val?.city}`
                              )
                            }
                          >
                            {val?.city}
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
              <div className="footer-col">
                <ul
                  className={
                    isOpenedCarousel == 2
                      ? "footer-mobile-active"
                      : "footer-mobile"
                  }
                >
                  {cities &&
                    cities.length > 0 &&
                    cities.map((val, index) => {
                      if (index > 20 && index < 25) {
                        return (
                          <li
                            style={{ fontSize: "14px" }}
                            onClick={() =>
                              navigate(
                                `/${title.split(" ").join("-")}-in-${val?.city}`
                              )
                            }
                          >
                            {val?.city}
                          </li>
                        );
                      }
                    })}
                  {!isArea && (
                    <li
                      style={{ fontSize: "14px" }}
                      onClick={() =>
                        navigate(`/${title.split(" ").join("-")}-in-delhi`)
                      }
                    >
                      Delhi
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="copyright">Vuezen © 2024, All Rights Reserved</div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Footer;
