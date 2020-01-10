import { persistReducer } from 'redux-persist';
import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';
// import authReducer from './Reducers/authreducer';  
import imgReducer from './Reducers/imgreducer';
import cartReducer from './Reducers/cartReducer';

// import cartReducer from './Reducers/cartReducer';
let rootReducer = combineReducers({imgReducer,cartReducer})

const persistConfig = {
    key: 'root',
    storage,
  }


const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer;
