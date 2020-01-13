import {PURCHASE_TOTAL} from './actionTypes';
import {CONTSINERS_PURCHASE} from './actionTypes';

const purchaseTotal = (price: number) => ({
    type: PURCHASE_TOTAL,
    payload: price,
});

const containersToPurchase = (containers: object) => ({
    type: CONTSINERS_PURCHASE,
    payload: containers,
});

export {purchaseTotal, containersToPurchase} 