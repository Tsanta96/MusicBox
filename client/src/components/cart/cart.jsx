import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { IS_LOGGED_IN } from '../../graphql/queries';
import CartRow from './CartRow';
import './cart.scss';

const Cart = props => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    const cartSum = products => {
        const result = products.reduce((acc, currentValue, ) => {
            return acc + currentValue.price
        }, 0);
        return result;
    };
    if (loading) {
        return <p>loading...</p>
    } else if (error) {
        return <p>Sorry there is an error</p>
    } else if (data.cart){
        return <div className="cart">
            <div className="cart-col">
                <div className="cart-head-row">
                    <h1 className="shopping-cart-header">Shopping Cart</h1>
                    <p className="price-header">
                        Price
                </p>
                </div>
                <div className="cart-prod-list">
                    {
                        data.cart.products.map((product, idx )=> (
                            <CartRow
                            key={idx}
                            cartId={data.cart._id} 
                            productId={product._id}
                            imageUrl={product.imageUrl}
                            title={product.name}
                            price={product.price}
                            index={idx}/>
                        ))
                    }
                    {
                        data.cart.products.length === 0 && (
                            <div>
                                <h1 className="no-items">There are no items in your shopping cart</h1>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="cart-subtotal-col">
                <div className="sub-cart-row">
                   <p className="subtotal-blk">
                        {`Subtotal (${data.cart.products.length} items):`}
                   </p>
                   <p className="price-red-new">
                        {`$${cartSum(data.cart.products).toFixed(2)}`}
                   </p>
            </div>
            <button className="cart-proceed-btn">
                Proceed to checkout
            </button>
            </div>
        </div>
    } else {
        return <div></div>
    }
}

export default Cart;