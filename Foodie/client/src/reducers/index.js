import { combineReducers } from 'redux';

const foodMenuReducer = (foodList = [], action) => {
    switch(action.type){
        case 'FETCH_FOOD_LIST':
            return action.payload;
        default:
            return foodList;
    }
}


export default combineReducers({
    foodMenu: foodMenuReducer
});