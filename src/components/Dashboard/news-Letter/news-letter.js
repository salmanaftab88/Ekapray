import React from 'react';
import { Row, Col } from 'reactstrap';
import './css/css.css';
// import { CustomInput, Form, FormGroup, Label, Input } from 'reactstrap';
// import { Button } from '@material-ui/core';
import fb from './images/fb-icon.png';
import whatsapp from './images/whats-icon.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class NewsLetter extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         email: ''

    //     };
    // }
    subscription = (event) => {
        event.preventDefault();
        debugger;
        var email = this.refs.myvalue.value;
        fetch('/subscription', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ email })
        }).then((resp) => {
            this.notify();
        })
    }
    notify = () => {
        toast.success("you are subscribed successfully and will be update!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });

    }
    render() {
        return (
            <div className="set-main-top">
             <ToastContainer />
                <div className="main-container">
                    <Row className="row" id="ro1">
                        <Col>Join Our NEWSLETTER</Col>
                    </Row>
                    <Row className="row" id="ro2">
                        <Col>Join Ekapray and get all the latest news, trends and offers</Col>
                    </Row>
                    <Row className="row">
                        <Col>
                            <form className="form-group" onSubmit={this.subscription}>
                                <input id="text-field" type="email" ref="myvalue" required />
                                <button id="sub-field" >join</button>
                            </form>
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col>
                        <a href="https://www.facebook.com/BrandClothingFactory/"> <img src={fb} id="fb" alt="fb"/> </a>
                        <a href="https://wa.me/923126668641">  <img src={whatsapp} id="whats" alt="whatsapp"/> </a>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
export default NewsLetter;