import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axiosInstances from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import styles from './Orders.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrder(this.props.token, this.props.userId);
    }

    render() {
        let content = (<Spinner />);
        if (!this.props.loading) {
            if (this.props.orders.length === 0) {
                content = (
                    <p style={{ textAlign: "center", marginTop: '58px', fontWeight: 'bold' }}>Orders Empty!</p>
                );
            } else {
                console.log('Orders--> ', this.props.orders);
                content = (
                    <div className={styles.Orders}>
                        {this.props.orders.map(order => (
                            <Order
                                key={order.id}
                                ingredients={order.ingredients}
                                price={order.price}
                            />))}
                    </div>
                );
            }
        }
        return content;
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrder: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosInstances)); 