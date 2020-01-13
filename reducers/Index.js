import {combineReducers} from 'redux';
import sortRewardsReducer from './Rewards/sortRewardsReducer';
import collectorReducer from './Collector';
import purchaseTotalReducer from './Payment/purchaseTotalReducer';
import getPointsReducer from './Progress/getPointsReducer';

export default combineReducers({
    sortRewardsReducer,
    collectorReducer,
    purchaseTotalReducer,
    getPointsReducer
})