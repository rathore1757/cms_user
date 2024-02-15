import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import OrderSummary from "../../Components/CheckoutSummary/OrderSummary";
import DeliveryAddress from "../../Components/CheckoutSummary/DeliveryAddress";

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [zipcode, setZipcode] = useState();
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <>
      <div className="cart-details-fluid">
        <Container>
          <Row>
            <DeliveryAddress
              zipcode={zipcode}
              setZipcode={setZipcode}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            <OrderSummary zipcode={zipcode} selectedAddress={selectedAddress} />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Checkout;
