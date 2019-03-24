import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName
    }
};

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCHED_INGREDIENTS_FAILED
    };
};

export const fetchIngredients = () => {
    return dispatch => {
        axiosInstance.get('https://burger-app-react-a408a.firebaseio.com/ingredients.json').then((response) => {
            dispatch(setIngredients(response.data));
        })
            .catch((error) => {
                dispatch(fetchIngredientsFailed());
            })
    };
};