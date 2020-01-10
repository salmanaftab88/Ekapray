import React from 'react';
// import { Route, Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import './css.css';
class AboutUs extends React.Component {
    render() {
        return (
            <div className="about-main">

                <Row>
                    <Col>
                        <h3> About Us </h3>
                       <br/> 
                        <p>
                    <p>  <strong>EKAPRAY BY RUBINA BOUTIQUE : <i>"MAKE YOUR OWN CHOICE"</i></strong> </p>
                        {/* <div className='our_details'> */}
                            We Sell Replica Designs Of all Pakistani Top Brands Including "Khaadi","Elan",
                            "Sana-Safinaz","Rungrez" and "Rung-Rasiya".Clothes are not only available for
                            Women but also For Kids.You name it ,We have it,Any Dress You see around the country,
                            Or in a Store Or Someone You Know is Wearing it,We are Bound To Have it.
                        {/* </div> */}
</p>

                    </Col>
                </Row>

            </div>
        )
    }
}

export default AboutUs;