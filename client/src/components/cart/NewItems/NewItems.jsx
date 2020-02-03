import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from "react-apollo";
import { IS_LOGGED_IN, FIND_USER_CART } from '../../../graphql/queries';
import { ApolloConsumer } from "react-apollo";
import './newItems.scss';
const NewItems = props => { 
    const cartSum = products => {
        const result = products.reduce((acc, currentValue, ) => {
            return acc + currentValue.price
        }, 0);
        console.log(result);
        return result;
    }
    return <ApolloConsumer>
        {client => (
            <Query query={IS_LOGGED_IN}>
                {({ data, loading, error }) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <div></div>;
                    if (data.cart){
                        console.log(data);
                        const lastProduct = data.cart.products[data.cart.products.length-1];
                        return (
                            <div>
                                <div className="new-items">
                                    <div className="cart-row">
                                        <div className="first-box">
                                            <div className="check-icon"></div>
                                            <div className="sml-cart-img-container">
                                                <img className="sml-cart-img" src={lastProduct.imageUrl} />
                                            </div>
                                            <p className="green-add-cart">Added to Cart</p>
                                        </div>
                                        <div className="second-box">
                                            <p className="cart-header-new">
                                                {`Cart Subtotal (${data.cart.products.length} items):`}
                                            </p>
                                            <p className="price-red-new">
                                                {`$${cartSum(data.cart.products).toFixed(2)}`}
                                            </p>
                                            <button className="outline-btn" onClick={() => props.history.push('/cart')}>
                                                Cart
                                            </button>
                                            <button className="proceed-btn">
                                                {`Proceed to checkout (${data.cart.products.length} items)`}
                                            </button>
                                        </div>
                                        <p className="green-add-cart">Added to Cart</p>
                                    </div>
                                    <div className="second-box">
                                        <p className="cart-header-new">
                                            {`Cart Subtotal (${data.cart.products.length} items):`}
                                        </p>
                                        <p className="price-red-new">
                                            {`$${cartSum(data.cart.products).toFixed(2)}`}
                                        </p>
                                        <button className="outline-btn" onClick={() => props.history.push("/cart")}>
                                            Cart
                                        </button>
                                        <button className="proceed-btn">
                                            {`Proceed to checkout (${data.cart.products.length} items)`}
                                        </button>
                                    </div>
                                </div>
                                {/* <div>
                                    <ul>
                                        {console.log(data.cart.products[0])}
                                        {data.cart.products.map((prod) => (
                                            <li>
                                                <h1>{prod.name}</h1>
                                            </li>
                                        ))}
                                    </ul>
                                </div> */}
                            </div>
                        )
                    } else {
                        return (
                            <div></div>
                        )
                    }
                }}
            </Query>
        )
        }
    </ApolloConsumer>
}

export default withRouter(NewItems);


