import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import missionImg from '../../Images/our-mission.webp'
import './About.scss'


const Section2 = () => {
  return (
    <>
    <Container className='mission-main'>
        <Row className='whatabout'>
            <Col lg={6} md={12}>
                <h3>Buy Glasses at Vuezen</h3>
                <h2>Our Mission</h2>
                <h4></h4>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using.</p>
                <p>Content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. </p>
                <p>Based on the long-term cooperation relationship with UPS, FedEx, DHL, and other major global delivery operators, Vuezen can provide world-class transportation. The professional warehouse staff will strictly follow our standard to pack your orders. And your products will be carefully inspected and packaged before shipment. Every day, we deliver items to thousands of customers around the world, which reflects our commitment as the world's largest online glasses supplier.</p>
            </Col>
            <Col lg={6} md={12}>
                <img src={missionImg} className='img-block-100'/>
            </Col>
        </Row>

    </Container>
    </>
  )
}

export default Section2