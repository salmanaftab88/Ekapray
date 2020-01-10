import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class EmailSender extends React.Component {
    state = {
        subscribedUsers: [],
        title: '',
        description: '',
        image: ''
    }
    notify = () => {
        toast.success("email send Successfully to subscribers!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });

    }
    componentDidMount() {
        var self = this;
        fetch('/getSubscribedUsers', {
            method: 'GET',
        }).then(function (res) {

            return res.json();

        }).then(function (data) {
            // console.log(data);
            self.setState({ subscribedUsers: data });
        })
    }
    sendMail = (event) => {
        event.preventDefault();
        // debugger;
        // var title = this.state.title;
        let formdata = new FormData();
        this.state.subscribedUsers.map((items) => {
            formdata.append('mails', items.email);
        })
        // this.state.file.map((items) => {
        //     formdata.append('file',items);
        // })
        debugger;
        formdata.append('title', this.state.title);
        formdata.append('description', this.state.description);
        formdata.append('file', this.state.image);
        // var getnew= mails;
        fetch('/sendMails', {
            method: 'POST',
            // headers: {
            //     "Content-Type": 'application/json'
            // },
            body: formdata
        }).then((resp) => {
            this.notify();
            setTimeout(() => {
                this.props.history.push(`/`);
            }, 2000);
        })
    }
    handlechange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    // fileSelectedHandler = (event) => {
    //     // this.setState({ file: [...this.state.file, ...e.target.files] })
    //     this.setState({ image: event.target.files[0] });
    // }
    handleimg = (event) => {
        this.setState({ image: event.target.files[0] });
    }

    render() {


        return (
            <div>
                <ToastContainer />
                {/* {this.state.subscribedUsers.map((items)=>{
                            return <span>{items.email}</span>
                        })} */}
                <Form >
                    <FormGroup>
                        <Label for="Title">Title</Label>
                        <Input type="text" name="title" id="title" ref='title' onChange={this.handlechange} placeholder="add title" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="images">Add Images</Label>
                        <Input type="file" name="file" id="file" onChange={this.handleimg} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Add Description</Label>
                        <Input type="textarea" name="description" onChange={this.handlechange} id="description" />
                    </FormGroup>
                    <Button onClick={this.sendMail}>Submit</Button>
                </Form>
            </div>
        );
    }
}