import React, { useState, useContext, useEffect } from "react";
import "./Header.scss";
import Logo from "../../../Images/vuezen-logo.webp";
import { Container } from "react-bootstrap";
import shopping_icon from "../../../Images/Bag.webp";
import indian_flag from "../../../Images/indian_flag.webp";
import Swal from "sweetalert2";
import heart_icon from "../../../Images/Heart.webp";
import search_icon from "../../../Images/Magnifer.webp";
import dropdown_icon from "../../../Images/dropdown_arrow.webp";
import user_icon from "../../../Images/User.webp";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { environmentVar } from "../../../config/environmentVar";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import AuthContext from "../../../context/AuthContext";
import { Modal, Button } from "react-bootstrap";
import { FilterContext } from "../../../context/FilterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCube,
  faFileCircleCheck,
  faGlasses,
  faHamburger,
  faHome,
  faObjectGroup,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faJediOrder, faWpexplorer } from "@fortawesome/free-brands-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

const Header = ({ setIsAuth, isAuth, profilePopUp, setProfilePopUp }) => {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [searchKey, setSearchKey] = useState("");
  const [show, setShow] = useState(false);
  const { country_code, setCountryCode } = useContext(FilterContext);
  const { symbol, setSymbol } = useContext(FilterContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const handleToggleNavbar = () => {
    setExpanded(!expanded);
  };
  const [searchData, setSearchData] = useState(null);
  const [isHomePage, setIsHomePage] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate(null);
  const location = useLocation();
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [offerData, setOfferData] = useState();
  const getRecentAndPopularSearches = () => {
    let config = {
      method: "get",
      url: `${environmentVar?.apiUrl}/api/product/fetch_search_params_data`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        setRecentSearches(response.data.orderByCreatedAt);
        setPopularSearches(response.data.orderBySearchCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getOfferDataTop = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/user/offer/get`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        if (response?.data?.data.length > 0) {
          setOfferData(response?.data?.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (location?.pathname === '/') {
      setIsHomePage(true);
    } else {
      setIsHomePage(false);
    }
  }, [location]);
  useEffect(() => {
    getRecentAndPopularSearches();
    getOfferDataTop();
    setSearchKey("");
    setSearchData(null);
  }, [show]);
  const handleChangeSearch = (value) => {
    setSearchKey(value);
    if (value.length >= 2) {
      let config = {
        method: "get",
        url: `${environmentVar?.apiUrl}/api/product/get_all_product_by_search?searchString=${value}&country_code=IN`,
        withCredentials: true,
      };
      axios
        .request(config)
        .then((response) => {
          setSearchData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSearchData([]);
    }
  };
  const handleClickNavSearch = (id) => {
    let data = {
      searchString: searchKey,
    };

    let config = {
      method: "post",
      url: `${environmentVar?.apiUrl}/api/product/search_params_data`,
      withCredentials: true,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        navigate(`/detailpage/${id}`);
      })
      .catch((error) => {
        toast.error("Unable to set search key", {
          autoClose: 2000,
        });
        navigate(`/detailpage/${id}`);
      });
  };
  const getSearchComponents = (searchData) => {
    if (searchData == null || searchData == undefined) {
      return <></>;
    } else if (searchData.length == 0) {
      return <div className="search-items-container">No Data Found</div>;
    } else if (searchData.length > 0) {
      return (
        <>
          {searchData.map((val) => (
            <div
              onClick={() => handleClickNavSearch(val?.id)}
              className="search-items-container"
            >
              <div className="search-items-img-wrapper">
                <img
                  src={`${environmentVar?.apiUrl}/uploads/${val?.thumbnail_img}`}
                />
              </div>
              <div>
                <div className="search-item-details">{val?.title}</div>
              </div>
            </div>
          ))}
        </>
      );
    } else {
      return <></>;
    }
  };
  const handleSignOut = () => {
    Swal.fire({
      title: "Sign Out",
      text: "Are you sure you want to sign out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sign Out",
    }).then((result) => {
      if (result.isConfirmed) {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${environmentVar?.apiUrl}/api/user/user_logout`,
        };

        axios
          .request(config)
          .then((response) => {
            setIsAuth(false);
            setUserInfo(null);
            setProfilePopUp(false);
            navigate("/");
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message || error?.message, {
              autoClose: 2000,
            });
          });
      }
    });
  };
  const getUserInitials = (name) => {
    if (name == null || name == undefined) {
      return "";
    }
    if (typeof name !== "string") {
      return "";
    }
    const userNameArr = name.split(" ");
    let initials;
    if (userNameArr?.length > 1) {
      return `${userNameArr[0].slice(0, 1)}${userNameArr[1].slice(0, 1)}`;
    } else {
      return `${userNameArr[0].slice(0, 1)}`;
    }
  };
  const fetchCategoriesData = async () => {
    const response = await axios.get(
      `${environmentVar?.apiUrl}/api/category/get_category`
    );
    return response?.data?.data;
  };

  const { data, isLoading, error } = useQuery(
    "categories",
    fetchCategoriesData
  );
  // console.log("data", data);
  const fetchCurrencyData = async () => {
    const response = await axios.get(
      `${environmentVar?.apiUrl}/api/currency/get_all_currency_user`
    );
    return response?.data?.data;
  };

  const {
    data: currencyData,
    isCurrrencyLoading,
    isCurrencyerror,
  } = useQuery("currencydata", fetchCurrencyData);

  const handleItemClick = (item) => {
    setCountryCode(item?.country_code);
    setSymbol(item?.symbol);
    setDropdownOpen(false);
  };
  return (
    <>
      <div className="headerstrip">
        {/* <h4>Now Live: Cyber Monday Sale Get Up To 60% Off*</h4> */}
        <h4>{offerData?.description}</h4>
      </div>
      <Container className="header">
        <div className="header-left">
          <Navbar expanded={expanded} expand="lg">
            <Navbar.Brand onClick={() => navigate("/")}>
              <img src={Logo} alt="Logo" />
            </Navbar.Brand>

            <div className="header-icons-for-mobile">
              <img
                src={heart_icon}
                onClick={() => {
                  if (isAuth) navigate("/wishlist");
                  else navigate("/login");
                }}
              />
              <img
                src={shopping_icon}
                className="cart-icon-for-mobile"
                onClick={() => {
                  if (isAuth) navigate("/cart");
                  else navigate("/login");
                }}
              />
              <Navbar.Toggle
                onClick={handleToggleNavbar}
                aria-controls="basic-navbar-nav"
              />
            </div>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <div className="mobile-logo-toggle">
                  <Navbar.Brand href="/">
                    <img src={Logo} />
                  </Navbar.Brand>

                  <Navbar.Toggle
                    onClick={handleToggleNavbar}
                    aria-controls="basic-navbar-nav"
                  />
                </div>
                {data?.map((item, index) => {
                  return item?.genderData.length > 0 ? (
                    <NavDropdown
                      title={item?.title}
                      id="basic-nav-dropdown"
                      key={index}
                    >
                      {item?.genderData?.map((innerItem, innerIndex) => {
                        // console.log(item, "iteminsideheadertocheck");
                        return (
                          <NavDropdown.Item
                            key={innerIndex}
                            onClick={() => {
                              handleToggleNavbar();
                              navigate(
                                `/glasses/${item?.title?.replace(/ /g, "")}/${item?.id
                                }/${innerItem?.value}/${innerItem?.id}`,
                                { state: item }
                              );
                            }}
                          >
                            <img
                              src={`${environmentVar?.apiUrl}/uploads/${innerItem?.image}`}
                            />{" "}
                            {innerItem?.value}
                          </NavDropdown.Item>
                        );
                      })}
                    </NavDropdown>
                  ) : (
                    <NavDropdown
                      title={item?.title}
                      id="basic-nav-dropdown"
                      key={index}
                      onClick={() =>
                        navigate(
                          `/glasses/${item?.title?.replace(/ /g, "")}/${item?.id
                          }/${item?.title?.split(" ")?.[0]}`,
                          { state: item }
                        )
                      }
                    >
                      {/* {item?.genderData?.map((innerItem, innerIndex) => {
                        return (
                          <NavDropdown.Item
                            key={innerIndex}
                            onClick={() =>
                              navigate(
                                `/glasses/${item?.title?.replace(/ /g, "")}/${
                                  item?.id
                                }/${innerItem?.value}/${innerItem?.id}`
                              )
                            }
                          >
                            <img
                              src={`${environmentVar?.apiUrl}/uploads/${innerItem?.image}`}
                            />{" "}
                            {innerItem?.value}
                          </NavDropdown.Item>
                        );
                      })} */}
                    </NavDropdown>
                  );
                })}

                {/* <Nav className="menutabs" onClick={() => navigate("/about")}>
                  About
                </Nav> */}
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          {/* <ul>
            <li>
              <img src={Logo} />
            </li>
            <li>Eyeglasses</li>
            <li>Sunglasses</li>
            <li>Computer glasses</li>
            <li>Kids glasses</li>
            <li>About</li>
          </ul> */}
        </div>
        {isHomePage && (
          <div className="search-for-mobile">
            <input
              type="text"
              placeholder="Search Eyewear"
              onClick={handleShow}
            />
            <img src={search_icon} />
          </div>
        )}

        <div className="header-right">
          <ul>
            <li className="navbar-right-icons">
              <img src={search_icon} onClick={handleShow} />
              <Modal
                show={show}
                onHide={handleClose}
                className="search-modal-main"
              >
                <Modal.Body
                  className="modal-inputs-search"
                  dialogClassName="modal-dialog-right"
                >
                  <input
                    onChange={(e) => handleChangeSearch(e.target.value)}
                    type="text"
                    value={searchKey}
                    placeholder="What are you looking for?"
                  />

                  <div className="search-items-box">
                    {/* <h2>Top Searches</h2> */}
                    {getSearchComponents(searchData)}
                  </div>
                  <h2>Recent Searches</h2>
                  <div className="flex-flexwrap">
                    {recentSearches ? (
                      <>
                        {recentSearches.map((val) => (
                          <h3
                            onClick={(e) =>
                              handleChangeSearch(val?.search_params)
                            }
                          >
                            {val?.search_params}
                          </h3>
                        ))}
                      </>
                    ) : (
                      <div>No Recent Searches Found</div>
                    )}
                  </div>
                  <h2>Popular Searches</h2>
                  {popularSearches ? (
                    <>
                      {popularSearches.map((val) => (
                        <p
                          onClick={() => handleChangeSearch(val?.search_params)}
                        >
                          {val?.search_params}
                        </p>
                      ))}
                    </>
                  ) : (
                    <>No Popular Searches Found</>
                  )}
                </Modal.Body>
              </Modal>
            </li>
            <li
              onClick={() => {
                if (isAuth) navigate("/wishlist");
                else navigate("/login");
              }}
              className="navbar-right-icons"
            >
              <img src={heart_icon} />
            </li>
            <li
              onClick={(e) => {
                if (isAuth) setProfilePopUp(!profilePopUp);
                else navigate("/login");
                e.stopPropagation();
              }}
              onMouseOver={() => {
                if (isAuth) setProfilePopUp(true);
              }}
              className="navbar-right-icons"
            >
              <img src={user_icon} />
            </li>
            <li
              onClick={() => {
                if (isAuth) navigate("/cart");
                else navigate("/login");
              }}
              className="navbar-right-icons"
            >
              <img src={shopping_icon} />
            </li>
            <li
              className="button"
              onClick={() => {
                if (isAuth) {
                  navigate("/tryon");
                } else {
                  navigate("/login");
                }
              }}
            >
              Try On
            </li>

            {profilePopUp ? (
              <>
                {" "}
                <div className="profile-popup-container">
                  <div className=".profile-popup-main">
                    <div className="profile-info-container">
                      <div className="profile-initials">{`${getUserInitials(
                        userInfo?.name
                      )}`}</div>
                      <div className="profile-name">{`Hi ${userInfo?.name}`}</div>
                    </div>
                    <hr className="profile-horizontal-line" />
                    <div className="profile-options">
                      <div
                        onClick={() => navigate("/myaccount")}
                        className="profile-option"
                      >
                        My Account
                      </div>
                      <div
                        onClick={() => navigate("/orderhistory")}
                        className="profile-option"
                      >
                        My Order
                      </div>
                      <div
                        onClick={() => navigate("/wishlist")}
                        className="profile-option"
                      >
                        My Wishlist
                      </div>
                    </div>
                    <hr className="profile-horizontal-line" />
                    <div className="profile-signout" onClick={handleSignOut}>
                      Sign Out
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </Container>
      {isHomePage && (
        <div className="bottom-menu">
          <ul>
            <li onClick={() => navigate("/")}>
              <FontAwesomeIcon
                icon={faHome}
                size="2x"
                className="bottom-menu-icon"
              />
              Home
            </li>
            <li>
              <FontAwesomeIcon
                icon={faGlasses}
                size="2x"
                className="bottom-menu-icon"
              />
              Explore
            </li>
            <li
              onClick={() => {
                if (isAuth) {
                  navigate("/tryon");
                } else {
                  navigate("/login");
                }
              }}
            >
              <FontAwesomeIcon
                icon={faCube}
                size="2x"
                className="bottom-menu-icon"
              />
              3D TryOn
            </li>
            {/* <li>
            <FontAwesomeIcon icon={faFileCircleCheck} size="2x" className="bottom-menu-icon" />
            Orders
            </li> */}
            <li>
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                className="bottom-menu-icon"
              />
              Profile
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
