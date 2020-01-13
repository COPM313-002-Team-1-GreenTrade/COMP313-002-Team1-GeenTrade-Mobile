import {SORT_REWARDS} from '../../actions/Rewards/actionTypes';
const initialState = {
    index: 0,
    routes: [
            { key: 'rewardList', title: 'Rewards List' },
            { key: 'rewardHistory', title: 'Redeemed History' },
            ],
};

const sortRewardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SORT_REWARDS:
            return {
                ...state,
                index: action.payload
            };
        default:
            return state;

    }
};

export default sortRewardsReducer;