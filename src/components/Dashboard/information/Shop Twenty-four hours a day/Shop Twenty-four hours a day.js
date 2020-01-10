import React from 'react';
import { Row, Col } from 'reactstrap';
import './css/Shop Twenty-four hours a day.css';
// import fb from './images/fb-icon.png';
// import whatsapp from './images/whats-icon.png';
class Information extends React.Component {
    render() {
        return (
            <div className="main-div">

                <Row>
                    <Col>
                        <h5>
                            About-Us
              </h5>
                        <div className='our_details'>
                            We Sell Replica Designs Of all Pakistani Top Brands Including "Khaadi","Elan",
                            "Sana-Safinaz","Rungrez" and "Rung-Rasiya".Clothes are not only available for
                            Women but also For Kids.You name it ,We have it,Any Dress You see around the country,
                            Or in a Store Or Someone You Know is Wearing it,We are Bound To Have it.
                    <p>  <strong>EKAPRAY BY RUBINA BOUTIQUE : <i>"MAKE YOUR OWN CHOICE"</i></strong> </p>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Information;