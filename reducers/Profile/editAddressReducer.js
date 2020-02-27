import {UPDATE_STREET, UPDATE_CITY, UPDATE_PROVINCE, UPDATE_POSTALCODE} from '../../actions/Profile/actionTypes';
const initialState = {
    street: "",
    city: "",
    province: "",
    postalCode: ""
};

const editAddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_STREET:
            return {
                ...state,
                street: action.payload
            };
            case UPDATE_CITY:
                return {
                    ...state,
                    city: action.payload
                };
                case UPDATE_PROVINCE:
            return {
                ...state,
                province: action.payload
            };
            case UPDATE_POSTALCODE:
            return {
                ...state,
                postalCode: action.payload
            };
        default:
            return state;

    }
};

export default editAddressReducer;