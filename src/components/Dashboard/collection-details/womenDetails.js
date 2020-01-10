import React from 'react';
import { Row, Col } from 'reactstrap';
import ReactImageMagnify from 'react-image-magnify';
import './css/css.css';
// import thumb1 from './images/1.jpg';
import thumb2 from './images/2.jpg';
import { withRouter } from 'react-router-dom'
import fb from './images/fb-icon.png';
import twitte from './images/twitter-icon.png';
import { Link } from 'react-router-dom';
import store from '../../../store/store'
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
class WomenDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
            file: [],
            img: '',
        };
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
    notify = () => {
        toast.success("item added to cart successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000
        });

    }
    componentDidMount() {
        fetch('/womenProducts', {
            method: 'GET',
        }).then(function (res) {

            return res.json();

        }).then((data) => {
            // var self=this;
            console.log(data);
            store.dispatch({
                type: "Women_Products",
                payload: data,
            })
            this.setState({
                todos: data
            })

        })
    }

    imagechange = (src) => {
        console.log(src)
        this.setState({
            img: src
        })


    }
    componentWillReceiveProps(props) {
        let product = props.nWomenProduct;
        let id = this.props.match.params.pid
        //  let src =product[0].file[0]
        product.filter((item) => {
            return item.description === id;
        }).map((item) => {
            let src = item.file[0]
            this.setState({
                img: src
            })

        })

    }
    render() {
        const { photoIndex, isOpen, img } = this.state;
        return (
            <div>
                {/* <strong>Note: </strong><span>click on the first below picture to show more pictures</span> */}
                <ToastContainer />
                {this.props.nWomenProduct.filter((item) => {
                    return item.description === this.props.match.params.pid;

                }).map((item) => {
                    return <Row className="Main-Con">
                        <Col sm="5">
                            {isOpen && (
                                <Lightbox

                                    mainSrc={item.file[photoIndex]}
                                    nextSrc={item.file[(photoIndex + 1) % item.file.length]}
                                    prevSrc={item.file[(photoIndex + item.file.length - 1) % item.file.length]}
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                    onMovePrevRequest={() =>
                                        this.setState({
                                            photoIndex: (photoIndex + item.file.length - 1) % item.file.length,
                                        })
                                    }
                                    onMoveNextRequest={() =>
                                        this.setState({
                                            photoIndex: (photoIndex + 1) % item.file.length,
                                        })
                                    }
                                />
                            )}
                            <div onClick={() => this.setState({ isOpen: true })}>
                                <ReactImageMagnify {...{
                                    smallImage: {

                                        alt: 'Wristwatch by Ted Baker London',
                                        isFluidWidth: Boolean,
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
                            </div>
                        </Col>
                        <Col sm="3" className="thum-h">
                            <center><div className="detail-thumb-1">
                                <img src={item.file ? item.file[1] : ''} onClick={() => { this.imagechange(item.file[1]) }} alt="detail-thumb-1" />
                            </div>
                                <div className="detail-thumb-2">
                                    <img src={item.file ? item.file[2] : ''} onClick={() => { this.imagechange(item.file[2]) }} alt="detail-thumb-1" />
                                </div></center>
                        </Col>
                        <Col sm="4" className="detail-main">
                            <div className="Title-Head">
                                <h5>{item.description}</h5>
                            </div>
                            <div className="sub-head">
                                <span>{item.brief}</span>
                            </div>
                            <div className="prices">
                                <span>Rs{item.price}.00</span>&nbsp;&nbsp;
                        <span><del>Rs{item.saleprice}.00</del></span>
                            </div>
                            <div className="BuyNow-butn">
                                <hr />
                                <button onClick={() => this.addToCart(item.price, item.description, item.file)}>Add To Cart</button>
                                <hr />
                            </div>
                            <div className="social-share">
                                <a href="https://www.facebook.com/BrandClothingFactory/">
                                    <img src={fb} alt="fb" />
                                </a>
                                &nbsp;
                                <a href="https://wa.me/923126668641" target="blank" className="">
                                    <img src={twitte} alt="" />
                                </a>
                            </div>
                            <div className="contact-link">
                                <Link to="/contact-us" className="link">contact us</Link>
                            </div>
                        </Col>
                    </Row>
                })}
            </div>
        );
    }
}
let NewVM = connect(function (store) {

    return {
        // nsps: store.imgReducer.sliderProduct,
        nWomenProduct: store.imgReducer.womenProducts,
        cart: store.cartReducer.cartItems
    }

})(WomenDetail);
export default NewVM;
