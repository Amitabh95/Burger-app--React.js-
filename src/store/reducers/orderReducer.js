import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        orderId: action.orderId
    };

    return updatedObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
};

const fetchOrderSuccess = (state, action) => {
    return updatedObject(state, {
        orders: action.orders,
        loading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START: return updatedObject(state, { loading: true })
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL: return updatedObject(state, { loading: false });
        case actionTypes.PURCHASE_INIT: return updatedObject(state, { purchased: false });
        case actionTypes.FETCH_ORDERS_START: return updatedObject(state, { loading: true });
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL: return updatedObject(state, { loading: false });
        default: return state;
    };
};

export default reducer;