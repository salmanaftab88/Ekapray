import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './css/css.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Menn from './men.jpg';
export default class MainPageProducts extends React.Component {
    render() {
        AOS.init();
        return (
            <div className="main-con">
                <Row className="main-Row">

                    <Col data-aos="fade-zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-delay="320"
                        data-aos-offset="0"
                        data-aos-mirror="true"
                        data-aos-once="false" xs="6" className="product-col1">

                        <Link to="/women">  <img src="https://cdn.shopify.com/s/files/1/2810/3666/files/page_2160x.jpg?v=1537891014" alt="women" />
                            <div className="text-over-product-col1">
                                Women
                        </div>
                            <div className="text-over-product-col1-h2">
                                Shop Now
                        </div>
                        </Link>

                    </Col>
                    <Col data-aos="fade-zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-delay="320"
                        data-aos-offset="0"
                        data-aos-mirror="true"
                        data-aos-once="false"
                        xs="6" className="product-col2">
                        <Link to="/kids">
                            <img src="https://cdn.shopify.com/s/files/1/2810/3666/files/2_540x.jpg?v=1537891039" alt="kids" />
                            <div className="text-over-product-col2">
                                Kids
                        </div>
                            <div className="text-over-product-col2-h2">
                                Shop Now
                        </div>
                        </Link>
                    </Col>
                </Row>
                <Row className="main-Row">
                    <Col data-aos="fade-zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-delay="320"
                        data-aos-offset="0"
                        data-aos-mirror="true"
                        data-aos-once="false"
                        xs="6" className="product-col2">
                        {/* <Link to="/men"> */}
                            <img src={Menn} alt="kids" />
                            <div className="text-over-product-col2">
                                Men
                        </div>
                            <div className="text-over-product-col2-h2">
                                Coming soon
                        </div>
                        {/* </Link> */}
                    </Col>

                    <Col data-aos="fade-zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-delay="320"
                        data-aos-offset="0"
                        data-aos-mirror="true"
                        data-aos-once="false"
                        xs="6" className="product-col2">
                        {/* <Link to="/kids"> */}
                            <img src="https://cdn.shopify.com/s/files/1/2810/3666/files/3_540x.jpg?v=1537891059" alt="kids" />
                            <div className="text-over-product-col2">
                                BedSheets
                        </div>
                            <div className="text-over-product-col2-h2">
                                Coming soon
                        </div>
                        {/* </Link> */}
                    </Col>
                </Row>
            </div>
        );
    }
}