import React from 'react';

export const Store = React.createContext();

const initialState = {
    posts: [],
    users: []
};

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_DATA':
            return { ...state, posts: action.payload };
        case 'FETCH_USER':
            return { ...state, users: [...state.users, action.payload] };
        default:
            return state;
    }
}

export function StoreProvider(props) {
    
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };
    console.log(state.users);
    return (
        <Store.Provider value={value}>
            {props.children}
        </Store.Provider>
    );
}