import React from 'react';

import styles from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className = {styles.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style = {{width: '100%', margin: 'auto'}}></div>
            <Burger ingredients = {props.ingredients}/>
            <Button btnType='Danger' clicked = {props.checkoutCancelled}>Cancel</Button>
            <Button btnType='Success' clicked = {props.checkoutContinue}>Continue</Button>
        </div>
    )
}

export default checkoutSummary;