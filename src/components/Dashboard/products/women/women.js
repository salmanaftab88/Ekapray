import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import store from '../../../../store/store';
import './css/css.css'
// import image from "./images/add.jpg"
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactImageMagnify from 'react-image-magnify';
import AuthService from '../../../account/AuthService';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class TodoApp extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            currentPage: 1,
            todosPerPage: 15,
            isOpen: false,
            open: false,
            price: '',
            description: '',
            image: [],
            saleprice: '',
            brandname: '',
            cats: '',
            brief: '',
            file: [],
            img: '',
        };
        this.handleClick = this.handleClick.bind(this);
        this.Authen = new AuthService();
    }
    notify = () => {
        toast.success("item added to cart successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000
        });

    }
    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = (event) => {
        this.setState({ open: false });
    }
    handleimg = (event) => {
        this.setState({ image: [...this.state.image, ...event.target.files] })
    }
    handleChange = price => event => {
        this.setState({ [price]: event.target.value });
    };
    handleChange = brief => event => {
        this.setState({ [brief]: event.target.value });
    };
    handleselect = event => {
        this.setState({ cats: event.target.value });
    };
    handleChange = brandname => event => {
        this.setState({ [brandname]: event.target.value });
    };
    handleChange = description => event => {
        this.setState({ [description]: event.target.value });
    };
    handleChange = saleprice => event => {
        this.setState({ [saleprice]: event.target.value });
    };
    saveData = (event) => {
        event.preventDefault();
        let formdata = new FormData();
        this.state.image.map((item) => {
            formdata.append('file', item)

        })
        formdata.append('price', this.state.price)
        formdata.append('description', this.state.description)
        formdata.append('saleprice', this.state.saleprice)
        formdata.append('brandname', this.state.brandname)
        formdata.append('brief', this.state.brief)
        formdata.append('cats', this.state.cats)
        this.setState({ open: false });


        fetch('/womenUploads', {
            method: "POST",
            body: formdata
        }).then((resp) => {

            if (resp) {

                // alert('DATA SAVED');
                window.location.href = "/women";
            }
        });
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
        // debugger;

        // this.setState({
        //     todos:get
        // })
    }
    toggle(price, description, image, saleprice) {
        debugger;
        if (description) {
            this.setState({
                modal: !this.state.modal,
                price: price,
                description: description,
                file: image,
                saleprice: saleprice,
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
    render() {
        AOS.init();
        console.log(this.state.todos);
        const { currentPage, todosPerPage, todos, img } = this.state;
        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
        console.log(currentTodos)
        const renderTodos = currentTodos.map((todo, index) => {
            return <div data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="320"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-offset="0" key={index} style={{ textAlign: "center", border: "solid rgpa(0,0,0,.87) 2px", backgroundColor: "rgpa(0,0,0,.87)", height: "auto" }} className="imageadd">
                <div className="women-product-additional">
                    <Link to={"/womenCollection/" + todo.description}>
                        <img style={{ width: "210px", height: "310px" }} src={todo.file ? todo.file[0] : ''} />
                    </Link>
                </div>
                {/* {console.log(todo)} */}

                <div className="women-quick">
                    <Button id="women-quick" onClick={() => this.toggle(todo.price, todo.description, todo.file, todo.saleprice)}  >{this.props.buttonLabel}Quick View</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} className={this.props.className}>
                        <ModalHeader toggle={this.toggle.bind(this)}>{this.state.description}</ModalHeader>
                        <ModalBody className="modalBody">
                            {/* {console.log(item,ind)} */}
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
                </div>


                <p className="imagedes">{todo.description}</p>
                <p className="imagedes">
                    <span  >  Rs{todo.price}.00 </span>
                    <del style={{ marginLeft: "10px", color: "red" }}>Rs{todo.saleprice}.00</del>
                </p>
                {this.Authen.loggedIn() ? (
                    <div>
                        <button get-id={todo._id} onClick={this.deleteProducts}>Delete</button>
                        <Link to={"/womenupdate/" + todo._id} ><button>update</button></Link>
                    </div>
                ) : null}
            </div>;
        })


        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            );
        });

        return (
            <div>
                <ToastContainer />
                <div>
                    {this.Authen.loggedIn() ? (
                        // <div>
                        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                            Add Carousel Items
                         </Button>
                        //  {/* </div> */}
                    ) : null}
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
                                label="Enter  Product Name"
                                type="text"
                                fullWidth
                                onChange={this.handleChange('brandname')}
                            />
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
                                label="Enter brief Description"
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

                            <select onChange={this.handleselect}>
                                <option value="">select a category</option>
                                <option value="Women">Women</option>
                                <option value="Men">Men</option>
                                <option value="Kids">Kids</option>
                            </select>


                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
</Button>
                            <Button onClick={this.handleClose} color="primary" onClick={this.saveData}>
                                Save
</Button>
                        </DialogActions>
                    </Dialog>
                </div>


                <div style={{ margin: "auto", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>

                    {renderTodos}
                </div >

                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>

            </div>
        );
    }
    deleteProducts = (event) => {
        let getparentNode = event.target.parentNode.parentNode;
        // console.log(getparentNode);
        let getid = event.target.getAttribute('get-id');
        // let formdata = new FormData();
        // formdata.append("file", event.target.getAttribute('get-file'));
        fetch('/delWomenproducts/' + getid, {
            method: "DELETE",
            // body: formdata
        }).then(function (res) {
            getparentNode.remove();
        });
    }
}
let NewVM = connect(function (store) {

    return {
        nWomenProduct: store.imgReducer.womenProducts,
        cart: store.cartReducer.cartItems
    }

})(TodoApp);
export default NewVM;


























