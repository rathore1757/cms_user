import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../../Components/Common/Footer/Footer";

const CMSpage = ({ slug }) => {
  const [blogData, setBlogData] = useState(null);
  const [isFooter, setIsFooter] = useState(true);
  useEffect(() => {
    getBlogDataBySlug();
  }, [slug]);
  useEffect(() => {
    const params = window.location.href.split("-").pop();
    console.log(params);
    if (params == "Seelampur") {
      setIsFooter(false);
    }
  }, [window.location.href]);
  const getBlogDataBySlug = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:2000/api/user/blog/get_blog/${slug}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response?.data?.data);
        setBlogData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
        setBlogData(null);
      });
  };
  return (
    <>
      {blogData && !Array.isArray(blogData) ? (
        <>
          <div style={{ width: "80%", margin: "auto" }}>
            <h2 style={{ marginBottom: "5px" }}>{blogData?.title}</h2>
            <h5 style={{ marginBottom: "5px" }}>{blogData?.description}</h5>
            <p style={{ marginBottom: "10px" }}>{blogData?.content}</p>
          </div>
        </>
      ) : (
        <>
          <div>Data not found</div>
        </>
      )}
      {blogData && isFooter && <Footer title={blogData?.title} />}
    </>
  );
};

export default CMSpage;
