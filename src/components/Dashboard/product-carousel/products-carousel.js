import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import store from '../../../store/store'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import './css/css.css';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactImageMagnify from 'react-image-magnify';
// import QuickView from '../quick-view/quic-view';
import { connect } from 'react-redux';
import AuthService from '../../account/AuthService';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ProductSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            open: false,
            modal: false,
            price: '',
            description: '',
            brief: '',
            image: [],
            saleprice: '',
            file: [],
            img: '',
        };
        this.Authen = new AuthService();
        this.toggle = this.toggle.bind(this);
    }
    notify = () => {
        toast.success("item added to cart successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000
        });

    }
    Click() {
        console.log("jaha");
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleChange = price => event => {
        this.setState({ [price]: event.target.value });
    };
    handleChange = brief => event => {
        this.setState({ [brief]: event.target.value });
    };
    handleChange = description => event => {
        this.setState({ [description]: event.target.value });
    };
    handleChange = saleprice => event => {
        this.setState({ [saleprice]: event.target.value });
    };
    handleimg = (event) => {
        this.setState({ image: [...this.state.image, ...event.target.files] })
    }
    handleClose = (event) => {
        this.setState({ open: false });
    }
    saveData = (event) => {
        event.preventDefault();
        let formdata = new FormData();
        this.state.image.map((item) => {
            formdata.append('file', item)
        })
        formdata.append('price', this.state.price)
        formdata.append('description', this.state.description)
        formdata.append('saleprice', this.state.saleprice)
        formdata.append('brief', this.state.brief)
        this.setState({ open: false });


        fetch('/sliderUploads', {
            method: "POST",
            body: formdata
        }).then((resp) => {
            // store.dispatch({
            //     type: "Slider_info",
            //     payload: {
            //         price: this.state.price,
            //         description: this.state.description,
            //         image: URL.createObjectURL(this.state.image),
            //         saleprice: this.state.saleprice,
            //     },
            // });
            if (resp) {

                alert('DATA SAVED')
                window.location.href = "/";
            }
        });
    }

    componentDidMount = () => {
        fetch('/getSliderProducts', {
            method: 'get',
        }).then(function (res) {

            return res.json();

        }).then(function (data) {
            console.log(data);
            store.dispatch({
                type: "get_slider_products",
                payload: data,
            })

        })
    }
    toggle(price, description, brief, image, saleprice) {
        debugger;
        if (description) {
            this.setState({
                modal: !this.state.modal,
                price: price,
                description: description,
                file: image,
                saleprice: saleprice,
                brief: brief,
                img: image[0]
            });

        }
        this.setState({
            modal: !this.state.modal
        })
    }
    imagechange = (src) => {
        // console.log(src)
        this.setState({
            img: src
        })
    }
    addToCart = (price, description, image) => {
        // console.log(price, description)
        // event.preventDefault();
        let { cart } = this.props
        this.setState({
            price: price,
            description: description,
            file: image
        });
        // console.log(this.state);
        let amount = 0;
        var descriptionMatched = false;
        for (let i = 0; i < cart.length; i++) {
            if (description == cart[i].description) {
                descriptionMatched = true;
                // cart[i].amount++;
                descriptionMatched = cart[i];
                break;
            }
        }


        if (!descriptionMatched) {
            store.dispatch({
                type: 'Add_To_Cart',
                payload: {
                    price: price,
                    description: description,
                    file: image,
                    amount: 1
                }

            });
        } else {
            store.dispatch({
                type: 'Update_Cart',
                payload: {
                    price: price,
                    description: description,
                    file: image,
                    amount: ++descriptionMatched.amount
                }

            });
        }

        this.notify();
    }

    render() {
        const { img } = this.state;
        console.log(this.state)
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        AOS.init();
        // alert("fjsfd");
        return (

            <div className="top-container">
                <ToastContainer />
                <div className="best-head-container">
                    <span>Best Sellers</span>

                    {/* <div className='popup_form'> */}
                    {this.Authen.loggedIn() ? (<div>
                        <Button id="hide-best-seller-add-butn" variant="outlined" color="primary" onClick={this.handleClickOpen}>
                            Add Carousel Items
</Button>
                    </div>) : null}
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="price_product"
                                label="Enter Price"
                                type="text"
                                fullWidth
                                onChange={this.handleChange('price')}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="description"
                                label="Enter title"
                                type="text"
                                fullWidth
                                onChange={this.handleChange('description')}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="brief"
                                label="Enter brief description"
                                type="text"
                                fullWidth
                                onChange={this.handleChange('brief')}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="salePrice"
                                label="Enter SalePrice"
                                type="text"
                                fullWidth
                                onChange={this.handleChange('saleprice')}
                            />
                            <input type='file' name='file' id='myFile' onChange={this.handleimg} multiple />




                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
</Button>
                            <Button color="primary" onClick={this.saveData}>
                                Save
</Button>
                        </DialogActions>
                    </Dialog>
                    {/* </div> */}
                </div>
                <div className="product-slider">
                    <Slider {...settings}>
                        {this.props.nsps.map((item, ind) => {
                            return <div data-aos="fade-zoom-in"
                                data-aos-easing="ease-in-back"
                                data-aos-delay="320"
                                data-aos-mirror="true"
                                data-aos-once="false"
                                data-aos-offset="0" className="set-alignmwent">
                                <div className="product-additional">
                                    <Link to={"/collection/" + item.description}><center><img src={item.file ? item.file[0] : ''} /></center></Link>
                                    <center><div className="Quick-view-btn">
                                        <Button id="quick-view-btnn" onClick={() => this.toggle(item.price, item.description, item.brief, item.file, item.saleprice)}  >{this.props.buttonLabel}Quick View</Button>
                                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                            <ModalHeader toggle={this.toggle}>{this.state.description}</ModalHeader>
                                            <ModalBody className="modalBody">
                                                {console.log(item, ind)}
                                                {/* {this.props.nQuickView.map((item) => { */}

                                                <div className="hide-images">
                                                    <ReactImageMagnify {...{
                                                        smallImage: {

                                                            alt: 'Wristwatch by Ted Baker London',
                                                            isFluidWidth: false,
                                                            width: 230,
                                                            height: 350,
                                                            src: img ? img : ''
                                                        },
                                                        largeImage: {
                                                            src: img ? img : '',
                                                            width: 1200,
                                                            height: 1800
                                                        }
                                                    }} style={{ zIndex: '1000' }} />
                                                    {/* <img src={this.state.file}/> */}
                                                    <span id="thum-image-1">
                                                        <img src={this.state.file ? this.state.file[1] : ''} onClick={() => { this.imagechange(this.state.file[1]) }} alt="thumb-1" />
                                                    </span>
                                                    <span id="thum-image-2">
                                                        <img src={this.state.file ? this.state.file[2] : ''} onClick={() => { this.imagechange(this.state.file[2]) }} alt="thumb-2" />
                                                    </span>

                                                </div>
                                                {/* })} */}
                                                <div className="modal-pic-des">
                                                    {/* Zainab Chotani D#6B  Embroidered Three Piece Lawn Collection */}
                                                    {this.state.description}
                                                    <br /><span>Rs{this.state.price}.00 <span><del>Rs{this.state.saleprice}.00</del></span></span>
                                                </div>
                                            </ModalBody>
                                            <ModalFooter className="footer-butn">
                                                <Button color="primary" id="butn" onClick={() => this.addToCart(this.state.price, this.state.description, this.state.file)}
                                                >Add To Cart
                                                </Button>
                                                {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}
                                            </ModalFooter>
                                        </Modal>
                                    </div></center>
                                </div>
                                <div className="main-des">
                                    <div className="product-discription">
                                        {item.description}
                                    </div>
                                    <div className="current-last-price">
                                        <span>Rs{item.price}.00 <span><del>Rs{item.saleprice}.00</del></span></span>
                                    </div>
                                </div>
                                {this.Authen.loggedIn() ? (
                                    <div>
                                        <button id="p-del-butn" get-file={item.file} get-id={item._id} onClick={this.deleteProducts}>Delete</button>&nbsp;
                                    <Link to={"/update/" + item._id} ><button id="p-updt-butn">update</button></Link>
                                    </div>
                                ) : null}

                            </div>
                        })}
                    </Slider>
                </div>
            </div>
        );
    }
    deleteProducts = (event) => {
        let getparentNode = event.target.parentNode.parentNode;
        console.log(getparentNode);
        let getid = event.target.getAttribute('get-id');
        let formdata = new FormData();
        formdata.append("file", event.target.getAttribute('get-file'));
        fetch('/delProduct/' + getid, {
            method: "DELETE",
            body: formdata
        }).then(function (res) {
            getparentNode.remove();
        });
    }
}

let NewVM = connect(function (store) {

    return {
        nsps: store.imgReducer.sliderProduct,
        cart: store.cartReducer.cartItems
        // nQuickView: store.imgReducer.quickView,
    }

})(ProductSlider);
export default NewVM;