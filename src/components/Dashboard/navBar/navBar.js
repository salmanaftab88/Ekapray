import React from 'react';
import { withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, Input } from 'reactstrap';
import store from '../../../store/store'
// import { connect } from 'react-redux';
import './css/css.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import AuthService from '../../account/AuthService';
// import withAuth from '../../account/withAuth';
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    this.Auth = new AuthService();
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  componentDidMount = () => {
    var getId = document.getElementById("logout-butn");
    if (this.Auth.loggedIn())
      getId.style.display = "block";
  }
  Searchform = (evt) => {

    evt.preventDefault();

    let searchCatigoires = this.refs.searchCatigoires.value;

    var option = {
      method: "POST",
      body: JSON.stringify({ searchCatigoires }),
      headers: {
        "Content-Type": "application/json",
      }

    }
    fetch("/searchdata", option)
      .then((res) => { return res.json() })
      .then((res) => {
        console.log(res)
        store.dispatch({
          type: "Search-data",
          payload: res,
        })

        this.props.history.push("/search-data");

      })


      .catch((error) => console.log(error))
  }
  render() {
    this.searchFun = (event) => {
      event.preventDefault();
      console.log("working");
    }
    return (
      <div id="main-nav">
        <Navbar className="NavBar" color="light" light expand="md">
          <NavbarBrand href="/" className="navbar-title">Ekapray</NavbarBrand>

          <NavbarToggler className="NavToggle" onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/" id="women"><NavLink>HOME</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to="/women" id="women"><NavLink>WOMEN</NavLink></Link>
              </NavItem>
              {/* <NavItem>
                <Link to="/men" id="women"><NavLink>MEN</NavLink></Link>
              </NavItem> */}
              <NavItem>
                <Link to="/kids" id="kids"><NavLink>KIDS</NavLink></Link>
              </NavItem>
              <UncontrolledDropdown id="logout-butn" nav inNavbar>
                <DropdownToggle nav caret>
                  ACCOUNTS
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.handlelogout.bind(this)}>
                    Logout
                  </DropdownItem>
                  {/* <DropdownItem divider /> */}
                  {/* <DropdownItem>
                    Reset
                  </DropdownItem> */}
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <InputGroup>
                  <form onSubmit={this.Searchform}>
                    <div className="Searchwrap">
                      <div className="searchBox">
                        {/* {searchboxvalue.value==""?alert("enter any query"):} */}
                        <input type="text" id="searchboxvalue" ref="searchCatigoires" class="searchTerm" placeholder="Search the Marketplace" required />
                        <button type="submit" class="searchButton">
                          {/* <Link id="linking" to="/search-data">
                            Search
                        </Link> */}
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                </InputGroup>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  handlelogout() {
    this.Auth.logout();
    window.location.href = '/admin-brandclothing/en/L9E2EWaSg5/GQAXVe6Zhm'
    // this.props.history.push('/admin-brandclothing/en/L9E2EWaSg5/GQAXVe6Zhm');
  }
}

export default withRouter(Header);