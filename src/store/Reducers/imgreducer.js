let initialState = {
    sliderImgs: [
        {

        },
    ],
    carouselProduct:
        [
            {

            }
        ],
    sliderProductinfo:
        [
            {

            }
        ],
    subscribedUserData:
        [
            {

            }
        ],
    sliderProduct:
        [
            {

            }
        ],
    searcheddata:
        [
            {

            }
        ],
    womenProducts:
        [
            {

            }
        ],
    menProducts:
        [
            {

            }
        ],
    kidProducts:
        [
            {

            }
        ],

    quickView: [

    ],



}

const imgReducer = (state = initialState, action) => {

    let newState = JSON.parse(JSON.stringify(state));

    if (action.type === "Carousel_info") {

        newState.carouselProduct.push(action.payload);
        // newState.inProcess = false;
        return newState;
    }
    else if (action.type === "Slider_info") {
        newState.sliderProductinfo.push(action.payload);
        // newState.inProcess = false;
        return newState;
    } else if (action.type === "Product_info_didmount") {
        newState.sliderImgs = action.payload;
        // newState.inProcess = false;
        return newState;
    }
    else if (action.type === "subscribed_user_data") {
        newState.subscribedUserData = action.payload;
        // newState.inProcess = false;
        return newState;
    }
    else if (action.type === "get_slider_products") {
        newState.sliderProduct = action.payload;
        // newState.inProcess = false;
        return newState;
    } else if (action.type === "Women_Products") {
        newState.womenProducts = action.payload;
        // newState.inProcess = false;
        return newState;
    } else if (action.type === "men_Products") {
        newState.menProducts = action.payload;
        // newState.inProcess = false;
        return newState;
    } else if (action.type === "getclicked") {
        newState.quickView = action.payload;
        // newState.inProcess = false;
        return newState;
    } else if (action.type === "Search-data") {
        newState.searcheddata = action.payload;
        // newState.inProcess = false;
        return newState;
    } else if (action.type === "kid_Products") {
        newState.kidProducts = action.payload;
        // newState.inProcess = false;
        return newState;
    }

    return newState;
}
export default imgReducer;