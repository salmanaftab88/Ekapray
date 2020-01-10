import React from 'react';
import { Route } from 'react-router-dom';
import TopHeader from './TopHeader/Topheader';
import LogoHeader from './logoBar/logoBar';
import NavBar from './navBar/navBar';
import RCarousel from './carousel/carousel';
import Women from './products/women/women';
import Men from './products/men/men';
import Kids from './products/kids/kids';
import MainPageProducts from './products on main page/main-page-products';
import ProductSlider from './product-carousel/products-carousel';
import NewsLetter from './news-Letter/news-letter';
import IncExp from './information/Increase your Shopping Experience/Increase your Shopping Experience'
import ReturnPolicy from './information/Return & Exchange Policy/Return & Exchange Policy'
import ShopTwentyFourHoursDay from './information/Shop Twenty-four hours a day/Shop Twenty-four hours a day'
import Footer from './footer/footer'
import Detail from './collection-details/detail';
import WomenDetail from './collection-details/womenDetails';
import MenDetail from './collection-details/menDetails';
import KidsDetail from './collection-details/kidsCollection';
import ContactUs from './contact-us/contact-us';
import AboutUs from './footer/innerpages/aboutus';
import ExcPolicy from './footer/innerpages/excPolicy';
import Login from '../account/login';
import cc from '../account/test';
import Update from './update-product/update';
import UpdateWomen from './women-updation/women-update';
import UpdateMen from './men-updation/men-update';
import subscriptionform from './email-sender-form/email-sender'
import Checkout from './checkout/checkout';
import Search from './searched data/search';
import UpdateKids from './kids-updation/kids-updation';
import SearchDetails from './search-data-details/search-data-detailss';
class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <TopHeader />
        <LogoHeader />
        <NavBar />
        <Route exact path="/" render={() => {
          return <React.Fragment>
            <RCarousel />
            <MainPageProducts />
            <ProductSlider />
            <NewsLetter />
            <IncExp />
            <ReturnPolicy />
            <ShopTwentyFourHoursDay />

          </React.Fragment>
        }
        }
        />
        <Route
          path="/women"
          component={Women}
        />
        <Route
          path="/men"
          component={Men}
        />
        <Route
          path="/kids"
          component={Kids}
        />
        <Route
          path="/collection/:pid"
          component={Detail}
        />
         <Route
          path="/womenCollection/:pid"
          component={WomenDetail}
        />
        <Route
          path="/menCollection/:pid"
          component={MenDetail}
        />
        <Route
          path="/kidsCollection/:pid"
          component={KidsDetail}
        />
        <Route
          path="/contact-us"
          component={ContactUs}
        />
        <Route
          path="/about-us"
          component={AboutUs}
        />
        <Route
          path="/return-exchange"
          component={ExcPolicy}
        />
         <Route
          path="/admin-brandclothing/en/L9E2EWaSg5/GQAXVe6Zhm"
          component={Login}
        />
         <Route
          path="/cc"
          component={cc}
        />
        <Route
          path="/update/:proid"
          component={Update}
        />
         <Route
          path="/womenupdate/:wooid"
          component={UpdateWomen}
        />
         <Route
          path="/menupdate/:wooid"
          component={UpdateMen}
        />
        <Route
          path="/kidsupdate/:kidsid"
          component={UpdateKids}
        />
        <Route
          path="/subscriptionForm"
          component={subscriptionform}
        />
         <Route
          path="/checkout"
          component={Checkout}
        />
        <Route
          path="/search-data"
          component={Search}
        />
        <Route
          path="/search-data-details/:xid"
          component={SearchDetails}
        />
        <Footer />
      </div>
    )
  }
}

export default Dashboard;