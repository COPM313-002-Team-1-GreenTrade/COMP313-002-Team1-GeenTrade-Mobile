import {UPDATE_AVATAR} from '../../actions/Profile/actionTypes';
const initialState = {
    avatarUrl: ''
};

const editAvatarReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_AVATAR:
            return {
                ...state,
                avatarUrl: action.payload
            };
        default:
            return state;

    }
};

export default editAvatarReducer;