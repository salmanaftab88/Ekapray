import React from 'react';
import { Row, Col } from 'reactstrap';
import './css/footer.css';
// import { CustomInput, Form, FormGroup, Label, Input } from 'reactstrap';
// import { Button } from '@material-ui/core';
import fb from './images/fb-icon.png';
import email from './images/mail-sender.png'
import whatsapp from './images/whats-icon.png';
import messenger from './images/messenger-icon.png';
import whatsap from './images/whatsapp-icon2.png';
import { Link } from 'react-router-dom';
import AuthService from '../../account/AuthService';
class Footer extends React.Component {
    constructor() {
        super();
        this.Authen = new AuthService();
    }

    componentDidMount = () => {
        var getClass = document.getElementById("mail");
        if (this.Authen.loggedIn())
            getClass.style.display = "block";
    }
    render() {
        return (
            <div className="mainDiv">
                <div className='inner_main_div'>
                    <Row>
                        <Col xs="6" sm="4">
                            <div className='about-us'>
                                About Us
                        </div>
                            <div className='about-us-details'>
                                We Sell Replica Designs Of all Pakistani Top Brands Including "Khaadi","Elan",
                                "Sana-Safinaz","Rungrez" and "Rung-Rasiya".
                        </div>
                        </Col>
                        <Col xs="6" sm="4">
                            <div className='about-us'>
                                Explore
                        </div>
                            <div className='about-us-details info_about_us'>
                                <ul>
                                    <li><Link to="about-us">About Us</Link></li>
                                    <li><Link to="/return-exchange">Return & Exchange Policy</Link></li>
                                    <li><Link to="/contact-us">Contact Us</Link></li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs="6" sm="4">
                            <div className='about-us'>
                                Contact Us
                        </div>
                            <div className='about-us-details footer_contact_us'>

                                <div>Name:                  Ekapray</div>
                                <div>Whatsapp;              03126668641</div>
                                <div>Address;               Ghulaam-Muhammad-Abad Faisalabad</div>

                            </div>
                        </Col>

                    </Row>


                </div>
                <Row className="media-butn-row">
                    <Col>
                        <a href="https://www.facebook.com/BrandClothingFactory/"><img id="fb-img" src={fb} alt="fb" /></a>
                        &nbsp;&nbsp;&nbsp;
                        <a href="https://wa.me/923126668641"><img id="wtsap-img" src={whatsapp} alt="whatsapp" /></a>
                    </Col>
                </Row>

                {/* <Row className="copyy"> */}
                {/* <Col id="copy-right">COPYRIGHT &copy; 2019 <a href="https://femalechoice.pk">www.feemalechoice.pk</a></Col> */}
                {/* <Col sm="4" id="whatsap-footer-fixed">.col-sm-4</Col> */}
                {/* </Row> */}
                <div className="fix-col">
                    <a href="https://m.me/BrandClothingFactory" target="blank" className=""><img src={messenger} id="mess-fixed-img" alt="messenger" /></a>
                </div>
                <div className="fix-col3" id="mail">
                    <Link to="/subscriptionForm" target="blank" title="send mail to the subscribers"><img src={email} id="email-sender" alt="email-sender" /></Link>
                </div>
                <div className="fix-col2">
                    <a href="https://wa.me/923126668641" target="blank" className=""><img src={whatsap} id="whats-fixed-img2" alt="whatsapp" /></a>
                </div>
            </div>
        );
    }
}
export default Footer;