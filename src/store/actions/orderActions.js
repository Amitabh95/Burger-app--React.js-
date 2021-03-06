import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId,
        orderData
    }
};

export const purchaseBurgerError = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
};
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axiosInstance.post('orders.json?auth=' + token, orderData)
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch((err) => {
                dispatch(purchaseBurgerError(err))
            })
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axiosInstance.get('/orders.json' + queryParams)
            .then((response) => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch((err) => {
                dispatch(fetchOrdersFail(err))
            });
    }
};