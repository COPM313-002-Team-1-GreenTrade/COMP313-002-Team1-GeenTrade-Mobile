import {UPDATE_AVATAR} from '../../actions/Profile/actionTypes';
const initialState = {
    avatarUrl: 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg'
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