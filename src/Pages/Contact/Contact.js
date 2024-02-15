import React, { useEffect } from "react";
import SmallBanner from "../../Components/Common/SmallBanner/SmallBanner";
import ContactForm from "../../Components/ContactComp/ContactForm";

const Contact = () => {
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <>
      <SmallBanner
        smallBannerImage={"contact_us.webp"}
        smallBannerHead={"Contact Us"}
      />
      <ContactForm />
    </>
  );
};

export default Contact;
