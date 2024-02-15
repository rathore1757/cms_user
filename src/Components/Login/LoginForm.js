import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import loginImg from "../../Images/login-img.webp";
import "./Login.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../formik/schemas/loginSchema.js";
import { environmentVar } from "../../config/environmentVar.js";
import { toast } from "react-toastify";
import Loader from "../Common/Loader/Loader";
import AuthContext from "../../context/AuthContext.js";
import { FilterContext } from "../../context/FilterContext.js";
import GoogleIcon from "../../Images/google.png";
import { useAuth0 } from "@auth0/auth0-react";
const LoginForm = ({ state }) => {
  const { isAuth, setIsAuth, userInfo, setUserInfo } = useContext(AuthContext);
  const { loginWithRedirect } = useAuth0();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const { setCountryCode, setSymbol } = useContext(FilterContext);

  const isAuthenticateUser = () => {
    axios.defaults.withCredentials = true;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/user/check_user_logged_in`,
      withCredentials: true,
    };
    axios
      .request(config)
      .then((response) => {
        setIsAuth(true);
        setUserInfo(response?.data?.data);
        setCountryCode(response?.data?.data?.country);
        setSymbol(
          response?.data?.data?.country === "US"
            ? "$"
            : response?.data?.data?.country === "IN"
            ? "₹"
            : response?.data?.data?.country === "AE"
            ? "د.إ"
            : "$"
        );
      })
      .catch((error) => {
        setIsAuth(false);
        setUserInfo(null);
      });
  };
  const initialValues = {
    email: "",
    password: "",
  };
  let formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsSubmit(true);

      let data = {
        email: values.email,
        password: values.password,
      };

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${environmentVar?.apiUrl}/api/user/login`,
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          toast.success("Login successfull", {
            autoClose: 2000,
          });
          setIsSubmit(false);
          setIsAuth(true);
          isAuthenticateUser();
          if (state) {
            navigate(`/${state}`);
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || error?.message, {
            autoClose: 2000,
          });
          setIsSubmit(false);
        });
    },
  });
  console.log(state, "state111");
  const { values, errors, handleSubmit } = formik;
  return (
    <>
      <Col md={5} className="login-form-main">
        <Form>
          <h1>Log In</h1>
          <p>Please enter your login details</p>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="logform-lable custom-placeholder-color">
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              // placeholder="e.g . johndoe@vuezen.com"
              className="logform-input"
              name="email"
              value={formik.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="eyeeye-main">
            <Form.Label className="logform-lable">Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              className="logform-input"
              name="password"
              value={formik.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FontAwesomeIcon
              onClick={() => setShowPassword(!showPassword)}
              className="eyeeye"
              icon={showPassword ? faEyeSlash : faEye}
            />
          </Form.Group>
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          ) : null}

          <Form.Group as={Row} className="mb-3">
            <Col xs={6}>
              {/* <Form.Check
                type="checkbox"
                label="Keep me signed in"
                className="keep-check"
              /> */}
            </Col>
            <Col xs={6} className="text-end">
              <a className="forgot-text" onClick={() => navigate("/forgot")}>
                Forgot Password?
              </a>
            </Col>
          </Form.Group>

          <Button
            onClick={handleSubmit}
            disabled={isSubmit}
            variant="primary"
            className="login-button"
          >
            {isSubmit ? <Loader size={30} /> : "Login"}
          </Button>
        </Form>
        <h3>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </h3>

        <div className="or-divider mt-3 mb-3">
          <span className="or-line"></span>
          <span className="or-text">Or sign in with</span>
          <span className="or-line"></span>
        </div>

        <div className="google-login">
          {/* <img src={GoogleIcon}/> Login with Google */}
          {/* <button onClick={() => loginWithRedirect()}> */}{" "}
          <img src={GoogleIcon} onClick={() => loginWithRedirect()} /> Login
          with Google
          {/* </button> */}
        </div>
      </Col>
    </>
  );
};

export default LoginForm;
