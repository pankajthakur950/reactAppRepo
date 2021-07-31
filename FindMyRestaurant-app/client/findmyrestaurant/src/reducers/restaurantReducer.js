import { FETCH_RESTAURANTS, SEARCH_RESTAURANTS, FETCH_RESTAURANT_DETAILS, UPDATE_RESTAURANT_REVIEW } from "actions/types";

const loadInitialState = () =>{
    let initialState = {
        restaurants: [],
        results_shown: 0,
        results_found: 0,
        selectedRestaurant: null,
        searchResults:[]
    }
    if(localStorage && localStorage.getItem('RESTAURANT_APP_STATE')){
        initialState = JSON.parse(localStorage.getItem('RESTAURANT_APP_STATE'));
        initialState.restaurants = [];
    }
    return initialState;
    
};

const updateLocalStorage = (state)=>{
    localStorage.setItem('RESTAURANT_APP_STATE', JSON.stringify(state));
}

const INITIAL_STATE = loadInitialState();

export default (state = INITIAL_STATE, action) => {
    let updatedState = state;
    switch (action.type) {
        case FETCH_RESTAURANTS:
            updatedState = { ...state, 
                    results_shown: action.payload.results_shown, 
                    results_found: action.payload.results_found,
                    restaurants: [...state.restaurants, ...action.payload.restaurants] 
                }
            break;
        case FETCH_RESTAURANT_DETAILS:
            updatedState = { ...state, selectedRestaurant: action.payload };
            break;
        case UPDATE_RESTAURANT_REVIEW:
            const selectedRestaurantReviews = [...state.selectedRestaurant.reviews, action.payload];
            const selectedRestaurant = { ...state.selectedRestaurant, reviews: selectedRestaurantReviews };
            updatedState = { ...state, selectedRestaurant };
            break;
        case SEARCH_RESTAURANTS:
            updatedState = {...state, searchResults: [...action.payload.restaurants]};
            break;
        default:
            updatedState = state;
    }
    updateLocalStorage(updatedState);
    return updatedState;
}