import React, { useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import "./Footer.scss";
import FootLogo from "../../../Images/vuezen-logo.webp";
import dropdown_icon from "../../../Images/dropdown_arrow.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { CartDetailContext } from "../../../context/CartDetailContext";

const Footer = () => {
  const navigate = useNavigate(null);
  const { homeUpdate, setHomeUpdate } = useContext(CartDetailContext);

  const [isOpenedCarousel, setIsOpenedCarousel] = useState(0);
  return (
    <>
      <div>
        <div className="footer-main">
          <Container>
            <div className="footer">
              <div className="footer-col">
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
              </div>
              <div className="footer-col">
                <h2
                  onClick={() => {
                    isOpenedCarousel == 1
                      ? setIsOpenedCarousel(0)
                      : setIsOpenedCarousel(1);
                  }}
                >
                  Company <img src={dropdown_icon} className="only-mobile" />
                </h2>
                <ul
                  className={
                    isOpenedCarousel == 1
                      ? "footer-mobile-active"
                      : "footer-mobile"
                  }
                >
                  <li>
                    <a onClick={() => navigate("/about")}>About</a>
                  </li>
                  <li
                    onClick={() => {
                      navigate(`/glasses/eyeglasses/1/men/1`);
                    }}
                  >
                    <a>Men Glasses</a>
                  </li>
                  <li
                    onClick={() => {
                      navigate(`/glasses/eyeglasses/1/men/3`);
                    }}
                  >
                    <a>Kids Glasses</a>
                  </li>
                  <li
                    onClick={() => {
                      navigate(`/glasses/eyeglasses/1/men/2`);
                    }}
                  >
                    <a>Women Glasses</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h2
                  onClick={() => {
                    isOpenedCarousel == 2
                      ? setIsOpenedCarousel(0)
                      : setIsOpenedCarousel(2);
                  }}
                >
                  Policies <img src={dropdown_icon} className="only-mobile" />
                </h2>
                <ul
                  className={
                    isOpenedCarousel == 2
                      ? "footer-mobile-active"
                      : "footer-mobile"
                  }
                >
                  <li>
                    <a onClick={() => navigate("/trackorder")}>Track Order</a>
                  </li>
                  <li>
                    <a onClick={() => navigate("/termsandconditions")}>
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a onClick={() => navigate("/privacypolicy")}>
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h2
                  onClick={() => {
                    isOpenedCarousel == 3
                      ? setIsOpenedCarousel(0)
                      : setIsOpenedCarousel(3);
                  }}
                >
                  Help <img src={dropdown_icon} className="only-mobile" />
                </h2>
                <ul
                  className={
                    isOpenedCarousel == 3
                      ? "footer-mobile-active"
                      : "footer-mobile"
                  }
                >
                  <li>
                    <a onClick={() => navigate("/myaccount")}>Account</a>
                  </li>
                  <li>
                    <a onClick={() => navigate("/orderhistory")}>Orders</a>
                  </li>
                  {/* <li>
                    <a>FAQ's</a>
                  </li> */}
                </ul>
              </div>
              <div className="footer-col">
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
