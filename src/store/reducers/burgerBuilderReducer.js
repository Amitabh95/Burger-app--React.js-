import * as actionLists from "../actions/actionTypes";
import { updatedObject } from "../../shared/utility";

const INGREDIENT_PRICES = {
    salad: 30,
    cheese: 35,
    meat: 65,
    bacon: 40
};

const initialState = {
    ingredients: null,
    totalPrice: 60,
    error: false,
    building: false
};


// We can optimize our code as follows
const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updatedObject(state, updatedState);
};

const removeIngredients = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
};

const setIngredients = (state, action) => {
    return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 60,
        // // Manually arranging the order
        // ingredients: {
        //     salad: action.ingredients.salad,
        //     bacon: action.ingredients.bacon,
        //     meat: action.ingredients.meat,
        //     cheese: action.ingredients.cheese
        // },
        building: false,
        error: false
    };
};

const fetchIngredientFailed = (state, action) => {
    return {
        ...state,
        error: true
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionLists.ADD_INGREDIENT: return addIngredient(state, action);

        case actionLists.REMOVE_INGREDIENT: return removeIngredients(state, action);

        case actionLists.SET_INGREDIENTS: return setIngredients(state, action);

        case actionLists.FETCHED_INGREDIENTS_FAILED: return fetchIngredientFailed(state, action);

        default: return state;
    }
};

export default reducer;