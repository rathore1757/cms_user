import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { environmentVar } from "../config/environmentVar";

const CartDetailContext = createContext(null);

const CartDetailProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [scroll, setScroll] = useState(null);
  const [homeUpdate, setHomeUpdate] = useState(null);
  const [collectionData, setCollectionData] = useState([]);

  const getCollectionData = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/collection/get_beautiful_eyewear`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        setCollectionData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCollectionData();
  }, []);

  const updateQuantity = (index, newQuantity) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].itemQuantity = newQuantity;
      return updatedItems;
    });
  };

  // Other state management code...

  return (
    <CartDetailContext.Provider
      value={{
        collectionData,
        cartItems,
        setCartItems,
        updateQuantity,

        scroll,
        setScroll,
        homeUpdate,
        setHomeUpdate,
        setCollectionData,
        // Other state values...
      }}
    >
      {children}
    </CartDetailContext.Provider>
  );
};

export { CartDetailProvider, CartDetailContext };
