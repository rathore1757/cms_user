import React, { useEffect, useState } from "react";
import "./OrdersTrack.scss";
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";
import { environmentVar } from "../../config/environmentVar";
import axios from "axios";
import { toast } from "react-toastify";
import html2pdf from "html2pdf.js";

const Root = styled.div`
  padding: 30px 0;
`;

const OrdersTrackDetailsSec = ({ responseData }) => {
  const [addressData, setAddressData] = useState(null);
  const downloadInvoice = () => {
    axios({
      url: `${environmentVar?.apiUrl}/api/order/download_invoice?order_id=${responseData?.order_id}`,
      method: "get",
      withCredentials: true,
      responseType: "text/html",
    })
      .then((response) => {
        // Create a download link for the generated PDF

        response = JSON.parse(response.data);
        console.log(1111555, response.data);
        const tempElement = document.createElement("div");
        tempElement.innerHTML = response.data;
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        iframe.contentDocument.open();
        iframe.contentDocument.write(response.data);
        iframe.contentDocument.close();

        // Use html2pdf to convert the iframe content to a PDF
        html2pdf(iframe.contentDocument.body, {
          margin: 10,
          filename: "generated_document.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        }).then(() => {
          // Remove the iframe from the DOM
          document.body.removeChild(iframe);
          toast.success("Invoice Downloaded Successfully", {
            autoClose: 2000,
          });
          // setIsDownloading(false);
        });

        // const downloadLink = document.createElement("a");
        // downloadLink.href = URL.createObjectURL(response.data);
        // downloadLink.download = `Invoice_${item?.order_id}.pdf`;
        // downloadLink.click();
      })
      .catch((error) => {
        // setIsDownloading(false);
        toast.error(error?.response?.data?.message || error?.message, {
          autoClose: 2000,
        });
      });
  };
  useEffect(() => {
    if (responseData) {
      let config = {
        method: "get",
        url: `${environmentVar?.apiUrl}/api/user/user_address/get_user_address_by_id?id=${responseData?.address_id}`,
        withCredentials: true,
      };

      axios
        .request(config)
        .then((response) => {
          setAddressData(response?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [responseData]);
  return (
    <>
      <Root>
        <div className="orderstrackdetails-sec-main">
          <Row>
            <Col md={4}>
              <div className="orderstrackdetails-sec">
                <div className="deliveryaddress">
                  <h2>Delivery Address</h2>
                  <h3>{addressData?.full_name}</h3>
                  <h4>
                    {`${addressData?.house_no}, ${addressData?.address}, ${addressData?.city} - ${addressData?.zipcode}, ${addressData?.state} ${addressData?.country}`}
                  </h4>
                  <h4>
                    <span>Phone number </span>
                    {addressData?.mobile}
                  </h4>
                </div>
              </div>
            </Col>
            <Col md={1} className="lines-bothsides">
              {/* <div className="orderstrackdetails-sec">
                <div className="deliveryaddress">
                  <h2>Your Rewards</h2>
                  <h5>14 Super Coins Cashback</h5>
                  <p>Use it to save on your next order</p>
                </div>
              </div> */}
            </Col>
            <Col md={4}>
              <div className="orderstrackdetails-sec">
                <div className="deliveryaddress">
                  <h2>More actions</h2>
                  <h3>Download Invoice</h3>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={downloadInvoice}
                    className="download-button"
                  >
                    Download
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Root>
    </>
  );
};

export default OrdersTrackDetailsSec;
