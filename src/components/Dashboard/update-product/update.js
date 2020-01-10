import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../store/store'


class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: {},
            price: "",
            description: "",
            saleprice: "",
            file: [],
            img: ''
        }

        this.state.obj = props.nsps.filter((item) => {
            return item._id === props.match.params.proid;

        })[0];



    }

    componentDidMount = () => {




        fetch('/getSliderProducts', {
            method: 'get',
        }).then(function (res) {

            return res.json();

        }).then((data) => {
            // var self=this;
            // console.log(data);
            store.dispatch({
                type: "get_slider_products",
                payload: data,
            })
        })
    }

    render() {

        let { obj } = this.state;

        return (
            <div> < Form  >
                <FormGroup>
                    <Label for="exampleEmail">Price</Label><br />
                    <span>entered price: {obj.price}</span>
                    <Input type="text" name="price" id="price" placeholder="enter price" ref='pricce' defaultValue={obj.price} onChange={this.handleChange("price")} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Description</Label><br />
                    <span>entered description: {obj.description}</span>
                    <Input type="textarea" name="description" id="desc" defaultValue={obj.description} onChange={this.handleChange("description")} />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">SalePrice</Label><br />
                    <span>entered saleprice: {obj.saleprice}</span>
                    <Input type="text" name="saleprice" id="saleprice" defaultValue={obj.saleprice} onChange={this.handleChange("saleprice")} placeholder="enter saleprice" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleFile">File</Label><br />
                    <img src={this.state.img} style={{ width: "50px" }} />
                    <Input type="file" name="file" id="file" onChange={this.handleimg} multiple />
                </FormGroup>
                <button get-id={obj._id} onClick={this.updatePro}>Update</button>
                {/* <input type='submit' value='Update' get-id={obj._id}/> */}
            </Form>
            </div>
        );
    }
    // handleChange = price => event => {
    //     this.setState({ obj: { [price]: event.target.value } });
    // };
    // handleChange = description => event => {

    //     this.setState({ obj: { [description]: event.target.value } });
    // };
    handleChange = saleprice => event => {

        debugger;
        let obj = this.state.obj || {};

        obj[saleprice] = event.target.value;

        this.setState({ obj });
    };
    handleimg = (event) => {
        let obj = this.state.obj || {};
        obj.file = [...this.state.file,...event.target.files]
        // obj.file=event.target.file[0]
        // obj.img = URL.createObjectURL(event.target.files[0]);

        this.setState({ obj });

        // console.log(this.state.obj)
    }
    // this.setState({ obj: { file: , img: URL.createObjectURL(event.target.files[0]) } });

    // }
    updatePro = (event) => {
        event.preventDefault();
        // let getimage = event.target.getAttribute('get-Img');
        let getId = event.target.getAttribute('get-id');
        let formdata = new FormData();
        let getfilearr = this.state.obj.file;
        getfilearr.map((item) => {
            formdata.append("file", item);
        })
        // console.log(this.refs.pricce.value);
        formdata.append("price", this.state.obj.price);
        formdata.append("description", this.state.obj.description);
        formdata.append("saleprice", this.state.obj.saleprice);
        debugger
        fetch('/update/' + getId, {
            method: "PUT",
            body: formdata
        }).then((res) => {
            // debugger
            this.props.history.push('/'); 
            // window.location.href= '/'
        }).catch(err => console.log('ERROR',err));
    }
}
let NewVM = connect(function (store) {

    return {
        nsps: store.imgReducer.sliderProduct
    }

})(Update);

export default NewVM;