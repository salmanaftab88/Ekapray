import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Row, Col } from 'reactstrap';
// import pic from './images/pic.jpg';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './css/topHeader.css';
import fb from './images/fb-icon.png';
import whatsapp from './images/whats-icon.png';
import cart from './images/cart-icon.png';
import home from './images/home-icon.png';
import { connect } from 'react-redux';
import { newExpression } from '@babel/types';
import { Link } from 'react-router-dom';
import store from '../../../store/store';
// import CustomizedSwitches from './switchicon';

// const styles = {
//     root: {
//         flexGrow: 1,
//     },

// };

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
class TopHeader extends React.Component {

    componentDidMount() {
        let a = 0
        for (let i = 0; i < cart.length; i++) {
            a = a + cart[i].amount

        }
        console.log(a)
        this.setState({ qnty: a })
    }


    state = {
        open: false,
        items: [""],
        qnty: 0,
        total: 0
    };
    componentWillReceiveProps(ets) {
        const cart = ets.nCartItems
        console.log(cart)
        let a = 0
        for (let i = 0; i < cart.length; i++) {
            a = a + (cart[i].price * cart[i].amount)

        }
        console.log(a)
        this.setState({ total: a })

    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({ open: false });
        store.dispatch({
            type: "Handle_Total",
            payload: this.state.total,
        })
    };

    add(a, b) {
        let price = a.price
        console.log(price)
        let newq = this.state.qnty + 1;
        a.amount++
        this.setState({
            qnty: newq,
            total: this.state.total + price

        })

        // this.props.handleTotal(this.props.price);
    }
    subtract(a, b) {
        let price = a.price
        a.amount--

        this.setState({
            qnty: this.state.qnty - 1,
            total: this.state.total - price
        });
        console.log(this.state.qnty);
        // this.props.handleTotal(-this.props.price);
    }
    render() {
        console.log(this.props.nCartItems.length);
        // console.log(this.state.total + ' ' + this.state.qnty)
        const { classes } = this.props;
        return (
            <div className={classes.root} className="topHead">
                <AppBar className="appBar" position="static" color="default">
                    <Toolbar>
                        <div className="topHeader-icons">
                            <a href="https://www.facebook.com/Brands-clothing-factory-outlet-by-Rubinas-boutique-953276524853708/">
                                <img src={fb} alt="fb" />
                            </a>
                            &nbsp;
                                <a href="https://wa.me/923126668641" target="blank">
                                <img src={whatsapp} alt="whatsapp" />
                            </a>
                        </div>
                        <div className="contact-details">
                            <span>Whatsapp: +923126668641 / Call: +923126668641</span>
                        </div>
                        <div className="top-right-icons">
                            {/* <span id="mycart">MY CART</span> */}
                            &nbsp;
                            <span className="cart-pop" onClick={this.handleClickOpen}>
                                <img src={cart} id="cart" alt="cart" />
                                <sup className="item-count">{this.props.nCartItems.length}</sup>
                            </span>
                            <Dialog
                                className="cart-dialog"
                                onClose={this.handleClose}
                                aria-labelledby="customized-dialog-title"
                                open={this.state.open}
                            >
                                <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                                    My Cart
          </DialogTitle>
                                {this.props.nCartItems.length === 0 ?
                                    <Typography gutterBottom className="empty-text-class">
                                        cart is empty now please add some items
</Typography>
                                    :
                                    <DialogContent dividers>
                                        {this.props.nCartItems.map((item) => {

                                            return <Typography gutterBottom>
                                                <Row>
                                                    <Col xs="12">
                                                        <div className="cart-main-conn">
                                                            <div>
                                                                <img src={item.file ? item.file[0] : ''} id="cart-pic" alt="cart-selected-product-imag" />
                                                            </div>
                                                            <div id="cart-item-detail">{item.description}</div>

                                                            <div className="add-sub-butn">
                                                                <button id="cart-butn-1" onClick={this.add.bind(this, item)}>+</button>&nbsp;{item.amount}
                                                                <button id="cart-butn-2" onClick={this.subtract.bind(this, item)} disabled={item.amount < 2}>-</button>
                                                            </div>
                                                             <div id="cart-item-price">Rs{item.price}.00</div>
                                                            <div className="del-butn"><button id="del-butn-2" onClick={()=>this.removelocal(item)}>x</button></div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <hr />
                                            </Typography>
                                        })}
                                        <DialogActions>
                                            <span>Total: {this.state.total}</span>
                                            <Link to='/checkout'>
                                                <Button onClick={this.handleClose} color="primary">
                                                    Checkout
            </Button>
                                            </Link>

                                        </DialogActions>
                                    </DialogContent>
                                }
                            </Dialog>
                            <Link to="/" id="home">
                                <img src={home} id="home" alt="home" />
                            </Link>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
    removelocal=(item)=>{
        store.dispatch({
            type:"Remove-cartItem",
            payload:item
        })
    }
}
TopHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};
let NewVM = connect(function (store) {

    return {
        nCartItems: store.cartReducer.cartItems,
    }

})(TopHeader);
export default withStyles(styles)(NewVM);