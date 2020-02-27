import {combineReducers} from 'redux';
import sortRewardsReducer from './Rewards/sortRewardsReducer';
import collectorReducer from './Collector';
import purchaseTotalReducer from './Payment/purchaseTotalReducer';
import getPointsReducer from './Progress/getPointsReducer';
import editAvatarReducer from './Profile/editAvatarReducer';
import editNameReducer from './Profile/editNameReducer';
import editEmailReducer from './Profile/editEmailReducer';
import editAddressReducer from './Profile/editAddressReducer';

export default combineReducers({
    sortRewardsReducer,
    collectorReducer,
    purchaseTotalReducer,
    getPointsReducer,
    editNameReducer,
    editAvatarReducer,
    editEmailReducer,
    editAddressReducer,
})