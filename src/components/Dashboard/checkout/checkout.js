import React from 'react';
import PropTypes, { func } from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import store from '../../../store/store';
import { connect } from 'react-redux';
import './css.css'
import { Row, Col } from 'reactstrap';
import { Collapse, CardBody, Card } from 'reactstrap';
import bg from './bgimg.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});
class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            email: '',
            phone: '',
            province: '',
            city: '',
            address: '',
            postalCode: '',
            desc: '',
            price: '',
            country: '',
            cartArray: []
        };
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }
    notify = () => {
        toast.success("order successfully you will also recieve your order detail!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });

    }
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    handleChange = email => event => {
        this.setState({ [email]: event.target.value });
    };
    handleChange = phone => event => {
        this.setState({ [phone]: event.target.value });
    };
    handleChange = province => event => {
        this.setState({ [province]: event.target.value });
    };
    handleChange = address => event => {
        this.setState({ [address]: event.target.value });
    };
    handleChange = city => event => {
        this.setState({ [city]: event.target.value });
    };
    handleChange = postalCode => event => {
        this.setState({ [postalCode]: event.target.value });
    };
    handleChange = country => event => {
        this.setState({ [country]: event.target.value });
    };

    componentDidMount() {
        this.setState({
            cartArray: this.props.nCartItems
        })
    }

    buyNow = (event) => {
        event.preventDefault();
        // debugger;
        let a = {
            cartNewItems: this.state.cartArray,
            address: this.state.address,
            city: this.state.city,
            phone: this.state.phone,
            email: this.state.email,
            name: this.state.name,
            totalamount: this.props.nTotal.total + 250,
            country: this.state.country,
        }
        fetch('/buyNow', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ a })
        }).then((resp) => {
            // alert('email sent')
            store.dispatch({
                type: "checkout",
                payload: this.state,
            });
        }).then((res) => {
            this.notify();
            setTimeout(() => {
                this.props.history.push(`/`);
            }, 2000);
        })
    }



    render() {
        const { classes } = this.props;
        return (
            <div className='checkout_main_div' style={{ backgroundImage: `url(${bg})` }}>
                <ToastContainer />
                <Button id="toggle-btn" onClick={this.toggle} style={{ marginBottom: '1rem', fontWeight: "bold", fontFamily: "sans-sarif" }}>Show order summary <pre>     </pre>Rs:{this.props.nTotal.total + 250}</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col xs="12">
                                    {this.props.nCartItems.map((item) => {
                                        return <div style={{ display: "flex", flexDirection: "column" }}>
                                            <div style={{ alignItems: "center", justifyContent: "space-around", display: "flex", flexDirection: "row" }} className="checkout-items">
                                                <img style={{ width: "64px", paddingBottom: "4px" }} src={item.file ? item.file[0] : ''} className='checkout_image' />
                                                <p className='checkout_desc'>{item.description} Maria B D-611 Green Embroidered Three Piece Lawn Collection</p>
                                                <span >Rs. {item.price}</span>
                                            </div>
                                        </div>
                                    })}

                                    <div style={{ padding: '10px', alignItems: "center", justifyContent: "space-between", display: "flex", flexDirection: "row", fontSize: '15px' }} >
                                        <p>SubTotal </p>
                                        <p>{this.props.nTotal.total}</p>
                                    </div>

                                    <div style={{ padding: '10px', alignItems: "center", justifyContent: "space-between", display: "flex", flexDirection: "row", fontSize: '15px' }} >
                                        <p>Shipping Charges </p>
                                        <p>{this.props.nTotal.total} + 250</p>
                                    </div>

                                    <div style={{ padding: '10px', alignItems: "center", justifyContent: "space-between", display: "flex", flexDirection: "row", fontSize: '15px', fontWeight: 'bold' }} >
                                        <p> Total </p>
                                        <p>{this.props.nTotal.total + 250}</p>
                                    </div>


                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Collapse>

                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Chekout Form
         </Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="text">Enter Name</InputLabel>
                                <Input id="name" name="name" autoFocus onChange={this.handleChange('name')} />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input onChange={this.handleChange('email')} id="email" name="email" autoComplete="email" autoFocus />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="phn_No">Phone</InputLabel>
                                <Input onChange={this.handleChange('phone')} name="phone" type="text" id="pNo" autoComplete="current-password" />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="phn_No">Province</InputLabel>
                                <Input onChange={this.handleChange('province')} name="phone" type="text" id="pNo" />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="phn_No">Country</InputLabel>
                                <Input onChange={this.handleChange('country')} name="phone" type="text" id="pNo" />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="phn_No">Address</InputLabel>
                                <Input onChange={this.handleChange('address')} name="phone" type="text" id="pNo" />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="phn_No">City</InputLabel>
                                <Input onChange={this.handleChange('city')} name="phone" type="text" id="pNo" />
                            </FormControl>                                     <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="phn_No">PostalCode</InputLabel>
                                <Input onChange={this.handleChange('postalCode')} type="text" id="pNo" />
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.buyNow}
                            >
                                Buy Now
          </Button>

                        </form>
                    </Paper>
                </main>
            </div>
        );
    }
}
Checkout.propTypes = {
    classes: PropTypes.object.isRequired,
};
let NewVM = connect(function (store) {

    return {
        nCartItems: store.cartReducer.cartItems,
        nTotal: store.cartReducer
    }

})(Checkout);
export default withStyles(styles)(NewVM);















// import React from 'react';
// import PropTypes, { func } from 'prop-types';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import FormControl from '@material-ui/core/FormControl';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import LockIcon from '@material-ui/icons/LockOutlined';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import withStyles from '@material-ui/core/styles/withStyles';
// import store from '../../../store/store';
// import { Row, Col } from 'reactstrap';
// import { Collapse, CardBody, Card } from 'reactstrap';
// import { connect } from 'react-redux';
// import bg from './bgimg.jpg';
// import './css.css'
// const styles = theme => ({
//     main: {
//         width: 'auto',
//         display: 'block', // Fix IE 11 issue.
//         marginLeft: theme.spacing.unit * 3,
//         marginRight: theme.spacing.unit * 3,
//         [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
//             width: 400,
//             marginLeft: 'auto',
//             marginRight: 'auto',
//         },
//     },
//     paper: {
//         marginTop: theme.spacing.unit * 8,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',

//         padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
//     },
//     avatar: {
//         margin: theme.spacing.unit,
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: '100%', // Fix IE 11 issue.
//         // marginTop: theme.spacing.unit,
//     },
//     submit: {
//         marginTop: theme.spacing.unit * 3,
//     },
// });
// class Checkout extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             name: '',
//             password: '',
//             email: '',
//             phone: '',
//             province: '',
//             city: '',
//             address: '',
//             postalCode: '',
//             desc: '',
//             price: '',
//         };
//         this.toggle = this.toggle.bind(this);
//         this.state = { collapse: false };
//     }
//     toggle() {
//         this.setState(state => ({ collapse: !state.collapse }));
//     }
//     handleChange = name => event => {
//         this.setState({ [name]: event.target.value });
//     };
//     handleChange = email => event => {
//         this.setState({ [email]: event.target.value });
//     };
//     handleChange = phone => event => {
//         this.setState({ [phone]: event.target.value });
//     };
//     handleChange = province => event => {
//         this.setState({ [province]: event.target.value });
//     };
//     handleChange = address => event => {
//         this.setState({ [address]: event.target.value });
//     };
//     handleChange = city => event => {
//         this.setState({ [city]: event.target.value });
//     };
//     handleChange = postalCode => event => {
//         this.setState({ [postalCode]: event.target.value });
//     };


//     buyNow = (event) => {
//         event.preventDefault();
//         // debugger;
//         let des;
//         let pri;
//         this.props.nCartItems.map((item) => {
//             des = item.description
//             pri = item.price
//         })
//         let a = {
//             description: des,
//             price: pri,
//             address: this.state.address,
//             city: this.state.city,
//             phone: this.state.phone,
//             email: this.state.email,
//             name: this.state.name,
//         }
//         fetch('/buyNow', {
//             method: 'POST',
//             headers: {
//                 "Content-Type": 'application/json'
//             },
//             body: JSON.stringify({ a })
//         }).then((resp) => {
//             alert('email sent')
//             store.dispatch({
//                 type: "checkout",
//                 payload: this.state,
//             });
//         })
//     }
//     render() {
//         const { classes } = this.props;
//         console.log(this.props.nTotal.total)
//         return (
//             <div className='checkout_main_div' style={{ backgroundImage: `url(${bg})` }}>
//                 <Button id="toggle-btn" onClick={this.toggle} style={{ marginBottom: '1rem', fontWeight: "bold", fontFamily: "sans-sarif" }}>Show order summary <pre>     </pre>Rs:{this.props.nTotal.total + 250}</Button>
//                 <Collapse isOpen={this.state.collapse}>
//                     <Card>
//                         <CardBody>
//                             <Row>
//                                 <Col xs="12">
//                                     {this.props.nCartItems.map((item) => {
//                                         return <div style={{ display: "flex", flexDirection: "column" }}>
//                                             <div style={{ alignItems: "center", justifyContent: "space-around", display: "flex", flexDirection: "row" }} className="checkout-items">
//                                                 <img style={{ width: "64px" }} src={item.file} className='checkout_image' />
//                                                 <p className='checkout_desc'>{item.description} Maria B D-611 Green Embroidered Three Piece Lawn Collection</p>
//                                                 <span >Rs. {item.price}</span>
//                                             </div>
//                                         </div>
//                                     })}

//                                     <div style={{ padding: '10px', alignItems: "center", justifyContent: "space-between", display: "flex", flexDirection: "row", fontSize: '15px' }} >
//                                         <p>SubTotal </p>
//                                         <p>{this.props.nTotal.total}</p>
//                                     </div>

//                                     <div style={{ padding: '10px', alignItems: "center", justifyContent: "space-between", display: "flex", flexDirection: "row", fontSize: '15px' }} >
//                                         <p>Shipping Charges </p>
//                                         <p>{this.props.nTotal.total} + 250</p>
//                                     </div>

//                                     <div style={{ padding: '10px', alignItems: "center", justifyContent: "space-between", display: "flex", flexDirection: "row", fontSize: '15px', fontWeight: 'bold' }} >
//                                         <p> Total </p>
//                                         <p>{this.props.nTotal.total + 250}</p>
//                                     </div>


//                                 </Col>
//                             </Row>
//                         </CardBody>
//                     </Card>
//                 </Collapse>
//                         <main className={classes.main}>
//                             <CssBaseline />
//                             <Paper style={{ width: "700px" }} className={classes.paper}>
//                                 <Avatar className={classes.avatar}>
//                                     <LockIcon />
//                                 </Avatar>
//                                 <Typography component="h1" variant="h5">
//                                     Chekout Form
//         </Typography>
//                                 <form className={classes.form}>
//                                     <FormControl margin="normal" required fullWidth>
//                                         <InputLabel htmlFor="text">Enter Name</InputLabel>
//                                         <Input id="name" name="name" autoFocus onChange={this.handleChange('name')} />
//                                     </FormControl>
//                                     <FormControl margin="normal" required fullWidth>
//                                         <InputLabel htmlFor="email">Email Address</InputLabel>
//                                         <Input onChange={this.handleChange('email')} id="email" name="email" autoComplete="email" autoFocus />
//                                     </FormControl>
//                                     <FormControl margin="normal" required fullWidth>
//                                         <InputLabel htmlFor="phn_No">Phone</InputLabel>
//                                         <Input onChange={this.handleChange('phone')} name="phone" type="text" id="pNo" autoComplete="current-password" />
//                                     </FormControl>
//                                     <FormControl margin="normal" required fullWidth>
//                                         <InputLabel htmlFor="phn_No">Province</InputLabel>
//                                         <Input onChange={this.handleChange('province')} name="phone" type="text" id="pNo" />
//                                     </FormControl>
//                                     <FormControl margin="normal" required fullWidth>
//                                         <InputLabel htmlFor="phn_No">Address</InputLabel>
//                                         <Input onChange={this.handleChange('address')} name="phone" type="text" id="pNo" />
//                                     </FormControl>
//                                     <FormControl margin="normal" required fullWidth>
//                                         <InputLabel htmlFor="phn_No">City</InputLabel>
//                                         <Input onChange={this.handleChange('city')} name="phone" type="text" id="pNo" />
//                                     </FormControl>
//                                     <FormControl margin="normal" required fullWidth>
//                                         <InputLabel htmlFor="phn_No">PostalCode</InputLabel>
//                                         <Input onChange={this.handleChange('postalCode')} type="text" id="pNo" />
//                                     </FormControl>


//                                     <Button
//                                         type="submit"
//                                         fullWidth
//                                         variant="contained"
//                                         color="primary"
//                                         className={classes.submit}
//                                         onClick={this.buyNow}
//                                     >
//                                         Buy Now
//           </Button>
//                                 </form>
//                             </Paper>
//                         </main>
//             </div>
//         );
//     }
// }



// Checkout.propTypes = {
//     classes: PropTypes.object.isRequired,
// };
// let NewVM = connect(function (store) {

//     return {
//         nCartItems: store.cartReducer.cartItems,
//         nTotal: store.cartReducer
//     }

// })(Checkout);
// export default withStyles(styles)(NewVM);
