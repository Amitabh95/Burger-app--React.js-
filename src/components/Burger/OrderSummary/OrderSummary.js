import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            if (props.ingredients[igKey] >= 1) { 
                return <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            } else {
                return false;
            }
        })
    return (
        <Aux>
            <h3>Your Orders</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Burger Price: <strong>₹ {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={props.cancelBtn}>Cancel</Button>
            <Button btnType='Success' clicked={props.continueBtn}>Continue</Button>
        </Aux>
    );
};

export default orderSummary;