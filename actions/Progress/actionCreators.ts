import {GET_POINTS} from './actionTypes';

const getPoints = (points: number) => ({
    type: GET_POINTS,
    payload: points,
});

export {getPoints} 