import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './css/css.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class ContactUs extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            number: "",
            message: ""
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    contactFun = (event) => {
        event.preventDefault();
        debugger;
        fetch('/contactus', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then((resp) => {
            this.notify();
            setTimeout(() => {
                this.props.history.push(`/`);
            }, 2000);
        })
    }
    notify = () => {
        toast.success("Mail Successfully Sent You will Be Approached Soon..!! Thankyou For Your Patience", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });

    }
    render() {
        return (
            <div className="contact-main">
                <ToastContainer />
                <div className="contct-heading">
                    <h3>Contact Us</h3>
                </div>
                <br />
                <Form onSubmit={this.contactFun}>
                    <FormGroup>
                        <Label for="exampleName">Name<span> *</span></Label>
                        <Input type="text" name="name" id="name" placeholder="Name" onChange={this.handleChange.bind(this)} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Email<span> *</span></Label>
                        <Input type="email" name="email" id="email" placeholder="Email" onChange={this.handleChange.bind(this)} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleNumber">Phone Number<span> *</span></Label>
                        <Input type="text" name="number" id="number" placeholder="Phone Number" onChange={this.handleChange.bind(this)} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Text Area<span> *</span></Label>
                        <Input type="textarea" name="message" id="ctext" placeholder="Message" onChange={this.handleChange.bind(this)} required />
                    </FormGroup>
                    <div className="cntct-butn">
                        <Button className="send-butn">send</Button>
                    </div>
                </Form>
            </div>
        );
    }
}