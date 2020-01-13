const initialState = {
    selected: {},
    rewardPoints: 0
};

const collectorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SELECTED":
            return {
                ...state,
                selected: action.payload,
            };

        case "INSERT_POINTS":
            return {
                ...state,
                rewardPoints: state.rewardPoints + action.payload 
            }
        
        case "GET_INITIAL_POINTS":
            return {
                ...state,
                rewardPoints: action.payload
            }
    
        default:
            return state;

    }
};

export default collectorReducer;