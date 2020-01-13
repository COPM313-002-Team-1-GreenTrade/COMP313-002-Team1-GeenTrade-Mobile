import {GET_POINTS} from '../../actions/Progress/actionTypes';
const initialState = {
    points: 0,
};

const getPointsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POINTS:
            return {
                ...state,
                points: action.payload
            };
        default:
            return state;

    }
};

export default getPointsReducer;