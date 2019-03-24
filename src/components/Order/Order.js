import React from 'react';

import styles from './Order.module.css';

const order = (props) => {

    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        if (ig.amount !== 0) {
            return <span
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
                key={ig.name}>
                {ig.name} ({ig.amount})
            </span>
        } else {
            return false;
        }
    })

    return (
        <div className={styles.Order}>
            <p>
                Ingredients: {ingredientOutput}
            </p>
            <p>
                Price: <strong>INR {props.price}</strong>
            </p>
        </div>
    );
}

export default order;