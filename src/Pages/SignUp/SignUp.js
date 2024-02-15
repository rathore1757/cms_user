import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Signup from "../../Components/Login/Signup";
import RightImg from "../../Components/Login/RightImg";
import LoginForm from "../../Components/Login/LoginForm";
import ResetPassword from "../../Components/Login/ResetPassword";
import { useLocation } from "react-router-dom";
const SignUp = ({ type }) => {
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  const { state } = useLocation();
  console.log(state);
  const getSignUpComponent = () => {
    if (type == "signup") {
      return <Signup />;
    } else if (type == "login") {
      return <LoginForm state={state}/>;
    } else if (type == "reset-password") {
      return <ResetPassword />;
    } else {
      return <></>;
    }
  };
  return (
    <>
      <Container>
        <Row>
          {getSignUpComponent()}
          <RightImg />
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
