import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./About.scss";
import about4Img from "../../Images/about4.webp";
import about5Img from "../../Images/about5.webp";

const Twoboxes = () => {
  return (
    <>
      <Container className="two-boxes-main">
        <Row className="two-boxes-header">
          <Col lg={8} mdOffset={4}>
            <h2>Because Sight With Sharon Stone</h2>
            <p>
              Iscover a unique eye care experience tailored to your needs. Join
              sharon stone as she explores the latest eyewear collections and an
              assortment of quality lenses in-store. Our experts are there to
              guide her every step of the way, helping her find the perfect
              vision solution for her eyes and lifestyle.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12} className="about-left-box">
            <img src={about4Img} className="img-block-100" />
            <h2>Because Quality</h2>
            <p>
              We offer a complete range of premium lens solutions, including the
              latest sun and clear lens technologies from the world’s leading
              brands. Simply choose the right option for you, from single vision
              to progressive lenses, and customize them to suit your vision and
              lifestyle.
            </p>
            <div className="shop-light">Shop Now</div>
          </Col>
          <Col md={6} xs={12} className="about-left-box">
            <img src={about5Img} className="img-block-100" />
            <h2>Because Their Future</h2>
            <p>
              Kids’ eye exams are especially important to ensure proper visual
              development and to help them succeed in school. Discover our
              complete eye care experience for kids, with an assortment of
              stylish frames and lenses designed to take care of young eyes.
            </p>
            <div className="shop-light">Shop Now</div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Twoboxes;
