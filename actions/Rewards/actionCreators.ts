import {SORT_REWARDS} from './actionTypes';

const sortRewards = (index: number) => ({
    type: SORT_REWARDS,
    payload: index,
});

export {sortRewards} 