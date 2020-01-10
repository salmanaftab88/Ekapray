
let initialState = {
    UserSignUp: { data: {} },
}

const authReducer = (state = initialState, action) => {

    // let newState = JSON.parse(JSON.stringify(state));

    // if (action.type == "UserSignUp") {
       
    //     newState.UserSignUp.data = action.payload;
    //     newState.UserSignUp.data = true;
    //     return newState;
    // }
  
    return state;
}

export default authReducer;