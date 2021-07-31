import { combineReducers } from "redux";
import authReducer from "reducers/authReducer";
import restaurantReducer from "reducers/restaurantReducer"

export default combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer
});