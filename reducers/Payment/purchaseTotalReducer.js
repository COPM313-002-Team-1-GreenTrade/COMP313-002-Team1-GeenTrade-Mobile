import {PURCHASE_TOTAL, CONTSINERS_PURCHASE} from '../../actions/Payment/actionTypes';
const initialState = {
    price: 0.00,
    containers: []
};

const purchaseTotalReducer = (state = initialState, action) => {
    switch (action.type) {
        case PURCHASE_TOTAL:
            return {
                ...state,
                price: action.payload
            };
        case CONTSINERS_PURCHASE:
            return {
                ...state,
                containers: action.payload
            };  
        default:
            return state;

    }
};

export default purchaseTotalReducer;