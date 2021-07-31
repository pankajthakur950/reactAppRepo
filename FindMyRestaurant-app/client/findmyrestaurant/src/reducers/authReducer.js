import { SIGN_IN, SIGN_UP_ERROR, SIGN_UP } from "actions/types";

const INITIAL_STATE = {
    isSignedIn: false,
    signUpErrors: [],
    currentUser: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, currentUser: action.payload };
        case SIGN_UP:
            return { ...state, isSignedIn: true, signUpErrors: [] }
        case SIGN_UP_ERROR:
            return { ...state, signUpErrors: [action.payload, ...state.signUpErrors] };
        default:
            return state;
    }
}