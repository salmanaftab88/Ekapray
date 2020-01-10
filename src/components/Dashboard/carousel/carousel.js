import React, { Component } from 'react';
import store from '../../../store/store'
import { connect } from 'react-redux';
import ReactBootstrapCarousel from "react-bootstrap-carousel";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import Carousel from 'react-bootstrap/Carousel'
import AuthService from '../../account/AuthService';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';


import AOS from 'aos';
import 'aos/dist/aos.css';

class Crousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            image: '',
        };
        this.Authen = new AuthService();
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleimg = (event) => {
        this.setState({ image: event.target.files[0] });
    }
    handleClose = (event) => {
        this.setState({ open: false });
    }
    saveData = (event) => {
        event.preventDefault();
        let formdata = new FormData();
        formdata.append('file', this.state.image)
        this.setState({ open: false });


        fetch('/uploads', {
            method: "POST",
            body: formdata
        }).then((resp) => {
            store.dispatch({
                type: "Carousel_info",
                payload: {
                    image: URL.createObjectURL(this.state.image),
                },
            });
            if (resp) {

                alert('DATA SAVED')
            }
        });
        // console.log(this.state);
    }
    componentDidMount() {
        fetch('/showCrouselProduct', {
            method: 'get',
        }).then(function (res) {

            return res.json();

        }).then(function (data) {

            console.log(data);
            store.dispatch({
                type: "Product_info_didmount",
                payload: data,
            })

        })

        var getId = document.getElementById('hide-carousel-button');
        if (this.Authen.loggedIn())
            getId.style.display = "block";
    }

    delete = (event) => {
        // event.preventDefault();
        // let getid = event.target.getAttribute('get-data');
        let getDelBtn = event.target.parentNode.parentNode;
        let formdata = new FormData();
        formdata.append("file", event.target.getAttribute('get-data'));
        fetch('/del/' + event.target.getAttribute('get-id'), {
            method: "DELETE",
            body: formdata
        }).then(function (res) {
            getDelBtn.remove();
        });
    }

    render() {
        AOS.init();
        return (
            <div>
                {this.Authen.loggedIn() ?
                    <Button id="hide-carousel-button" variant="outlined" color="primary" onClick={this.handleClickOpen}>
                        Add Carousel Items
 </Button>
                    : null}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
                    <DialogContent>

                        <input type='file' name='file' onChange={this.handleimg} />



                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
</Button>
                        <Button color="primary" onClick={this.saveData} >
                            Save
</Button>
                    </DialogActions>
                </Dialog>

                <Carousel>
                    {this.props.nsliderImgs.map((item) => {
                        return <Carousel.Item>
                            {
                                this.Authen.loggedIn() ? (
                                    <div>
                                        <button get-data={item.file} get-id={item._id} id="del-btn" onClick={this.delete}>Delete image</button>
                                    </div>
                                ) : null
                            }
                            <img
                                data-aos="fade-zoom-in"
                                data-aos-easing="ease-in-back"
                                data-aos-delay="320"
                                data-aos-offset="0"
                                data-aos-mirror="true"
                                data-aos-once="false"
                                className="d-block w-100"
                                src={item.file}
                                alt="First slide"
                            />
                        </Carousel.Item>
                    })}
                </Carousel>

            </div>
        )
    }

}
let NewVM = connect(function (store) {

    return {
        nsliderImgs: store.imgReducer.sliderImgs,
    }

})(Crousel);
export default NewVM;

// import React, { Component } from 'react';
// import store from '../../../store/store'
// import { connect } from 'react-redux';

// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
// import AuthService from '../../account/AuthService';
// import './css/css.css';
// // import { func } from 'prop-types';
// class DemoCarousel extends Component {

//     render() {
//         return (
//             <div>
//                

//                 <Carousel className="site-carousel" showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={true} stopOnHover={true} dynamicHeight={true}>
//                     {this.props.nsliderImgs.map((item) => {
//                         return <div>
//                           
//                             <img src={item.file} alt="carousel-pic" id="carouselImage" />
//                         </div>
//                     })}
//                 </Carousel>
//             </div>
//         );
//     }


// let NewVM = connect(function (store) {

//     return {
//         nsliderImgs: store.imgReducer.sliderImgs,
//     }

// })(DemoCarousel);
// export default NewVM;