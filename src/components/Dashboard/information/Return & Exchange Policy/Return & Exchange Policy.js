import React from 'react';
import { Row, Col } from 'reactstrap';
import './css/Return and Exchange Policy.css';
class Information extends React.Component {
    render() {
        return (
            <div className="main-div">

                <Row>
                    <Col>
                        <h5>
                            Return & Exchange Policy
              </h5>
                        <div className='our_details'>
                          You can apply for Return and Exchange Within 7 Days of your Purchase,
                          If you are not satisfied with your purchase,Please return it to uss within 
                          7 Days of your Purchase. We will gladly issue a refund or process an exchange maximum within
                          a week of recieving the returned goods. For Further Details Check US our Page "Return and exchange
                          Policy Below".Thankyou..!
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Information;