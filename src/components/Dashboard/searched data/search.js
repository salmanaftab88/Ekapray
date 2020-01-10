import React from 'react'
// import store from '../../../store/store'
import { connect } from 'react-redux';
import './css/css.css'
import oops from './images/oops.jpeg';
import { Link } from 'react-router-dom';
class Search extends React.Component {
    render() {
        return (
            <div>
                {this.props.nSearch.length == '0' ?
                    <div style={{ textAlign: "center", width: "100%" }}><img src={oops} style={{ width: "50%" }} /></div>
                    :
                    // debugger;
                    this.props.nSearch.map((items) => {
                        return <span className="imageadd">
                            {/* <Link to={item.description}> */}
                            <Link to={"/search-data-details/" + items.description}>
                                <img style={{ width: "210px", height: "310px" }} src={items.file ? items.file[0]:''} />
                            </Link>
                            {/* </Link> */}
                            <p className="imagedes">{items.description}</p>
                            <p className="imagedes">
                                <span  >  Rs{items.price}.00 </span>
                                <del style={{ marginLeft: "10px", color: "red" }}>Rs{items.saleprice}.00</del>
                            </p>
                        </span>;
                    })
                }
            </div>
        )
    }
}
let NewVM = connect(function (store) {

    return {
        nSearch: store.imgReducer.searcheddata,
    }

})(Search);
export default NewVM;