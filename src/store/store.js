import { createStore } from 'redux';
import persistedReducer from './persist'
// let rootReducer = combineReducers({authReducer ,imgReducer,cartReducer})
let store = createStore(persistedReducer)
    // , {
    // cartReducer: localStorage.getItem('cartItems')
// });

export default store;