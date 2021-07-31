import React from 'react';

export const AppContext = React.createContext();

const loadInitialState = () =>{
    let initialState = {
        cart: [],
        loggedIn: false
    }
    if(localStorage && localStorage.getItem('BREW_APP_STATE')){
        initialState = JSON.parse(localStorage.getItem('BREW_APP_STATE'));
    }
    return initialState;
    
};
const updateLocalStorage = (state)=>{
    localStorage.setItem('BREW_APP_STATE', JSON.stringify(state));
}
let updatedCart = null;
function reducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            const newCartItem = action.payload;
            let isNewCartItem = true;
            updatedCart = state.cart.map(item=>{
                if(item.id===newCartItem.id){
                    isNewCartItem = false;
                    item.quantity++;
                }
                return item;
            });
            if(isNewCartItem){
                newCartItem.quantity=1;
                updatedCart = [...updatedCart, newCartItem];
            }
            let updatedState = { ...state, cart: updatedCart };
            updateLocalStorage(updatedState);
            return updatedState;
        case 'UPDATE_CART_ITEM':
            updatedCart = state.cart.map(item=>item.id===action.payload.id ? action.payload: item);
            updatedState = { ...state, cart: updatedCart };
            updateLocalStorage(updatedState);
            return updatedState;
        case 'DELETE_CART_ITEM':
            updatedCart = state.cart.filter(item=>item.id !== action.payload.id);
            updatedState = { ...state, cart: updatedCart };
            updateLocalStorage(updatedState);
            return updatedState;
        default:
            return state;
    }
}

export default function AppContextProvider(props) {
    const initialAppState = loadInitialState();
    
    const [state, dispatch] = React.useReducer(reducer, initialAppState);
    const value = { state, dispatch };
    console.log(state.cart);
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}