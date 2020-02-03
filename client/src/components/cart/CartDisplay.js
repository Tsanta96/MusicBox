import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from "@apollo/react-hooks";
import { IS_LOGGED_IN }from '../../graphql/queries';
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import '../../stylesheets/cart_display.scss';

const CartDisplay = (props) => {

const { loading: showLoading, error: showError, data: cartData } = useQuery(IS_LOGGED_IN);

    if (showLoading || cartData.cart === null) {
        return <LoadingIcon />
    } else {
        return (
            <div>
                <div className="shopping-cart-header">
                    <h1>Shopping Cart</h1>
                </div>
                <div className="list-of-cart-items">
                    <ul>
                        {cartData.cart.products.map(prod => (
                            <li key={prod._id}>
                                <div className="entire-cart-product">
                                    <div className="cart-product-img">
                                        <img src={prod.imageUrl} />
                                    </div>
                                    <div className="cart-product-name-price-description">
                                        <div className="cart-product-name-price">
                                            <div className="cart-product-name">
                                                <p>{prod.name}</p>
                                            </div>
                                            <div className="cart-product-price">
                                                <p>{prod.price}</p>
                                            </div>
                                        </div>
                                        <div className="cart-product-description">
                                                <Link to={`/products/${prod._id}`}>Click here for more Details</Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {console.log("This is my cart!", cartData)}
            </div>
        )
    }
}

export default CartDisplay;
