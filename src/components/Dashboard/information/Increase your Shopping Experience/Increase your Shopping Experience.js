import React from 'react';
import { Row, Col } from 'reactstrap';
import './css/Increase your Shopping Experience.css';
class Information extends React.Component {
    render() {
        return (
            <div className="main-div">

                <Row>
                    <Col>
                        <h5>
                        CASH ON DELIVERY TERMS AND CONDITONS
                          
              </h5>
                        <div className='our_details'>
                   
                        All customers are herby notified that as per Terms and Conditions
                        of COD , the courier company will not allow the customer to open the package before Payment.
                        You as the customer,has Right to Return the package Only After Payment and acknowledged
                        of the delivery to the courier company.If you want to return the package you will need to 
                        notify us after payment to the courier and then u need to send us back the package at your own Expense 
                        for Return Or Exchange.
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Information;