import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styled from 'styled-components'
import phoneIcon from '../../Images/phone.webp'
import liveChatIcon from '../../Images/livechat-icon.webp'
import helpIcon from '../../Images/help-icon.webp'

const Root = styled.div`
    background-color: #F9FAFB;
    padding: 50px 0 30px;
`;

const ContactDetails = () => {
  return (
    <>  
        <Root>
            <Container className='contact-details-box-main'>
                <Row>
                    <Col md={4} className='contact-details-box b-30'>
                        <img src={phoneIcon}/>
                        <h2>+1 (302) 990-0619</h2>
                        <div className='contact-details-box-timings'>
                            <p>Mon. - Fri. 7:00 AM - 6:00 PM</p>
                            <p>Sat. - Sun. 5:00 PM - 6:00 PM</p>
                        </div>
                    </Col>
                    <Col md={4} className='contact-details-box b-30'>
                        <img src={liveChatIcon}/>
                        <h2>Live chat</h2>
                        <div className='contact-details-box-timings'>
                            <p>Mon. - Fri. 7:00 AM - 6:00 PM</p>
                            <p>Sat. - Sun. 5:00 PM - 6:00 PM</p>
                        </div>
                    </Col>
                    <Col md={4} className='contact-details-box'>
                        <img src={helpIcon}/>
                        <h2>Help & FAQs</h2>
                        <div className='contact-details-box-timings'>
                            <p>All of your eyewear questions answered all in one place.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Root>
    </>
  )
}

export default ContactDetails