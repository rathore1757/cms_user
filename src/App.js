import logo from "./logo.svg";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Payment from "./Components/Checkoutform/Payment";
import Homepage from "./Pages/Homepage/Homepage";

import About from "./Pages/About/About";
import Header from "./Components/Common/Header/Header";
import Footer from "./Components/Common/Footer/Footer";
import Login from "./Pages/Login/Login";
import Forgot from "./Components/Login/Forgot";
import SignUp from "./Pages/SignUp/SignUp";
import WomenEyeglasses from "./Pages/Eyeglasses/WomenEyeglasses";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailPage from "./Components/DetailPage/DetailPage";
import AuthContext from "./context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { environmentVar } from "./config/environmentVar";
import axios from "axios";

import Wishlist from "./Pages/Wishlist/Wishlist";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import TermsConditions from "./Pages/TermsPrivacy/TermsConditions";
import PrivacyPolicy from "./Pages/TermsPrivacy/PrivacyPolicy";
import TrackOrder from "./Pages/TrackOrder/TrackOrder";
import OrdersTrack from "./Pages/OrderTrack/OrdersTrack";
import Contact from "./Pages/Contact/Contact";
import { FilterContext, FilterProvider } from "./context/FilterContext";
import { ProductDetailProvider } from "./context/ProductDetailContext";
import { CartDetailProvider } from "./context/CartDetailContext";
import TryOn3d from "./Components/3dtryon/TryOn3d";
import TryOn from "./Components/TryOn/TryOn";
import LinkPage from "./Pages/LinkPage/LinkPage";
// import Payment from "./Components/Checkoutform/Payment";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [profilePopUp, setProfilePopUp] = useState(false);
  const { country_code, setCountryCode, setSymbol } = useContext(FilterContext);
  const [landingPageData, setLandingPageData] = useState(null);
  const getLandingPageData = () => {
    let config = {
      method: "get",
      url: `${environmentVar?.apiUrl}/api/ui/get_landing_page_data `,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(response);
        setLandingPageData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        getLandingPageData();
      })
      .catch((error) => {
        setIsAuth(false);
        setUserInfo(null);
      });
  };
  // console.log(environmentVar?.stripeKey);

  useEffect(() => {
    getLandingPageData();
    setCountryCode("IN");
    isAuthenticateUser();
  }, []);

  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user, isAuthenticated, isLoading);

  // const getOAuthData = async () => {
  //   const getDTa = await getIdTokenClaims();
  //   const getDTa11 = await getAccessTokenSilently();
  //   console.log(getDTa, "getDTa", getDTa11);
  // };
  // useEffect(() => {
  //   getOAuthData();
  // }, []);

  return (
    <div onClick={() => setProfilePopUp(false)}>
      <CartDetailProvider>
        <ProductDetailProvider>
          <AuthContext.Provider
            value={{ isAuth, setIsAuth, userInfo, setUserInfo }}
          >
            <ToastContainer />
            <Router>
              <Header
                setIsAuth={setIsAuth}
                isAuth={isAuth}
                profilePopUp={profilePopUp}
                setProfilePopUp={setProfilePopUp}
              />

              <Routes>
                <Route
                  path="/"
                  exact
                  element={<Homepage landingPageData={landingPageData} />}
                />
                <Route path="/subscribe" exact element={<LinkPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<SignUp type={"login"} />} />
                <Route path="/signup" element={<SignUp type={"signup"} />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route
                  path="reset-password"
                  element={<SignUp type={"reset-password"} />}
                />
                <Route path="/detailpage/:id" element={<DetailPage />} />
                <Route
                  path="/glasses/:category/:catid/:gender/:genderid"
                  element={<WomenEyeglasses />}
                />
                <Route
                  path="/glasses/:category/:catid/:gender"
                  element={<WomenEyeglasses />}
                />
                <Route path="/tryon" element={<TryOn3d />} />
                <Route
                  path="/myaccount"
                  element={<Wishlist path={"myaccount"} />}
                />
                <Route
                  path="/accountinfo"
                  element={<Wishlist path={"accountinfo"} />}
                />
                <Route
                  path="/orderhistory"
                  element={<Wishlist path={"orderhistory"} />}
                />
                <Route
                  path="/wishlist"
                  element={<Wishlist path={"wishlist"} />}
                />
                <Route
                  path="/coupons"
                  element={<Wishlist path={"coupons"} />}
                />
                <Route
                  path="/address"
                  element={<Wishlist path={"address"} />}
                />
                <Route
                  path="/helpcenter"
                  element={<Wishlist path={"helpcenter"} />}
                />
                <Route path="/payment" element={<Payment />} />

                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />

                <Route path="/orderstrack/:id" element={<OrdersTrack />} />

                <Route
                  path="/termsandconditions"
                  element={<TermsConditions />}
                />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/trackorder" element={<TrackOrder />} />
              </Routes>
              <Footer />
            </Router>
          </AuthContext.Provider>
        </ProductDetailProvider>
      </CartDetailProvider>
    </div>
  );
}

export default App;
