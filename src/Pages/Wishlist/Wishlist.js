import React, { useContext, useEffect } from "react";
import PersonalSidebar from "../../Components/Common/PersonalCenter/PersonalSidebar";
import MyWishlist from "../../Components/MyWishlist/MyWishlist";
// import AccountInfo from '../../Components/AccountInfo/AccountInfo'
import { Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Coupens from "../../Components/Coupens/Coupens";
import MyOrders from "../../Components/MyOrders/MyOrders";
import Address from "../../Components/Address/Address";
import AccountInfo from "../../Components/AccountInfo/AccountInfo";
import MyAccount from "../../Components/MyAccount/MyAccount";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const WishlistMain = styled.div`
  background-color: #f9fafb;
  padding: 50px 0;
  @media screen and (max-width: 576px) {
    padding: 20px 0;
  }
`;

const Wishlist = ({ path }) => {
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  const getComponent = () => {
    if (path == "wishlist") {
      return <MyWishlist />;
    } else if (path == "coupons") {
      return <Coupens />;
    } else if (path == "orderhistory") {
      return <MyOrders />;
    } else if (path == "address") {
      return <Address />;
    } else if (path == "accountinfo") {
      return <AccountInfo />;
    } else if (path == "myaccount") {
      return <MyAccount />;
    } else {
      return <></>;
    }
  };

  console.log("isAuth", isAuth);
  useEffect(() => {
    if (isAuth === false) {
      navigate("/login", { state: path });
    }
  }, [isAuth, path]);

  return (
    <>
      <WishlistMain>
        <Container>
          <Row>
            <PersonalSidebar />
            {getComponent()}
          </Row>
        </Container>
      </WishlistMain>
    </>
  );
};

export default Wishlist;
