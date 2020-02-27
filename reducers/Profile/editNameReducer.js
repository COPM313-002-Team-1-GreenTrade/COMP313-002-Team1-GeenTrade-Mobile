import {UPDATE_FIRST_NAME, UPDATE_LAST_NAME, EXIT_WITHOUT_SAVE} from '../../actions/Profile/actionTypes';
const initialState = {
    firstName: '',
    lastName: ''
};

const editName = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FIRST_NAME:
            return {
                ...state,
                firstName: action.payload,
            };
        case UPDATE_LAST_NAME:
            return {
                ...state,
                lastName: action.payload,
            };
        case EXIT_WITHOUT_SAVE:
            return {
                initialState
            }
        default:
            return state;

    }
};

export default editName;