import {UPDATE_EMAIL} from '../../actions/Profile/actionTypes';
const initialState = {
    email: ''
};

const editEmailReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_EMAIL:
            return {
                ...state,
                email: action.payload
            };
        default:
            return state;

    }
};

export default editEmailReducer;