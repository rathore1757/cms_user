import React from "react";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MyOrders.scss";
import orderProductImg from "../../Images/order-product.webp";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import html2pdf from "html2pdf.js";
import Swal from "sweetalert2";

const SingleOrder = ({ item, index, updateState, setUpdateState }) => {
  const navigate = useNavigate(null);
  const downloadInvoice = async (item) => {
    // try {
    //   const response = await axios.get(
    //     `${environmentVar?.apiUrl}/api/order/download_invoice`,
    //     {
    //       responseType: "blob",
    //       withCredentials: true,
    //     }
    //   );

    //   const url = window.URL.createObjectURL(new Blob([response.data]));
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.setAttribute("download", "invoice.json");
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // } catch (err) {
    //   console.log(err);
    // }
    axios({
      url: `${environmentVar?.apiUrl}/api/order/download_invoice?order_id=${item?.order_id}`,
      method: "get",
      withCredentials: true,
      responseType: "text/html",
    })
      .then((response) => {
        // Create a download link for the generated PDF

        response = JSON.parse(response.data);
        // console.log(1111555, response.data);
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
  console.log("item, index", item);

  // let createdTime = new Date(item?.created_at)
  //   .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  //   .split(", ")[0]
  //   .replace(/\//g, "-");
  let createdTime = new Date(item?.created_at).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let dulieveryDate = new Date(item?.delivery_date)
    .toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
    })
    .replace(/\s/g, " ");

  const cancelOrder = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          order_id: item?.order_id,
        };

        let config = {
          method: "put",
          url: `${environmentVar?.apiUrl}/api/order/cancel_order`,
          withCredentials: true,
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            setUpdateState(!updateState);
            toast.success("Order cancelled Successfully", {
              autoClose: 2000,
            });
            // console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.message, {
              autoClose: 2000,
            });
          });
      }
    });
  };
  return (
    <>
      <div className="single-order-main">
        <div className="single-order-content">
          <div className="single-order-content-img">
            {item?.variant_quantity?.map((innerItem, innerIndex) => {
              return (
                <div key={innerIndex}>
                  <img
                    src={`${environmentVar?.apiUrl}/uploads/${innerItem?.thumbnail_url}`}
                  />
                  <div>{innerItem?.variant_name}</div>
                </div>
              );
            })}
          </div>
          <div className="single-order-product-details">
            <h3>
              Order {item?.order_id} | <span>{createdTime}</span>
              {/* {item?.status} */}
            </h3>
            <h2>
              {/* {item?.variant_quantity?.[0]?.variant_name} |{" "} */}
              {item?.status === "delivered" ? (
                <span style={{ color: "green" }}>Delivered</span>
              ) : item?.status === "cancelled" ? (
                <span style={{ color: "red" }}>Cancelled</span>
              ) : (
                <span>Delivery expected by {dulieveryDate}</span>
              )}
            </h2>
            <div className="order-buttons">
              {item?.status === "processing" ||
              item?.status === "new" ||
              item?.status === "outfordelivery" ||
              item?.status === "delivered" ? (
                <button
                  className="product-button new-pad mr-20"
                  onClick={() => navigate(`/orderstrack/${item?.order_id}`)}
                >
                  Track Order
                </button>
              ) : (
                item?.status === "cancelled" && ""
              )}

              {item?.status === "delivered" ? (
                <button
                  className="product-light-white-button new-pad"
                  onClick={() =>
                    navigate(
                      `/detailpage/${item?.variant_quantity?.[0]?.product_id}`
                    )
                  }
                >
                  View Item
                </button>
              ) : item?.status === "new" ? (
                <button
                  className="product-light-white-button new-pad"
                  onClick={() => cancelOrder(item)}
                >
                  Cancel Order
                </button>
              ) : (
                (item?.status === "processing" ||
                  item?.status === "cancelled") &&
                ""
              )}
              {/* <button
                className="product-light-white-button new-pad"
                onClick={() => cancelOrder(item)}
              >
                Cancel Order
              </button> */}
            </div>
          </div>
        </div>
        <div
          onClick={() => downloadInvoice(item)}
          className="single-order-invoice"
        >
          <FontAwesomeIcon
            icon={faDownload}
            size="2x"
            className="invoice-download"
          />{" "}
          Invoice
        </div>
      </div>
    </>
  );
};

export default SingleOrder;
