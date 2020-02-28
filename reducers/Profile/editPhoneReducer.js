import {UPDATE_PHONE} from '../../actions/Profile/actionTypes';
const initialState = {
    phone: ""
};

const editPhoneReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PHONE:
            var cleaned = ('' + action.payload).toString().replace(/\D/g, '')
            var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
            if (match) {
                var intlCode = (match[1] ? '+1 ' : ''),
                    number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
                    return {
                        ...state,
                        phone: number
                    };
            }
        default:
            return state;

    }
};

export default editPhoneReducer;