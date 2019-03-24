import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad (₹ 30)', types: 'salad' },
    { label: 'Bacon (₹ 40)', types: 'bacon' },
    { label: 'Cheese (₹ 35)', types: 'cheese' },
    { label: 'Meat (₹ 65)', types: 'meat' },
];

const buildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>Current Price: <strong>₹ {props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.types)}
                removed={() => props.ingredientRemoved(ctrl.types)}
                disabled={props.disabled[ctrl.types]}
            />
        ))}
        <button
            className={styles.OrderButton}
            disabled={!props.purchaseable}
            onClick={props.purchasing}>{props.isAuth ? 'Order Now' : 'Signin / Signup to continue'}</button>
    </div>
);

export default buildControls;