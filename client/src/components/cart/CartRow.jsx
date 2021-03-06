import React from 'react';
import { withRouter } from 'react-router';
import { DELETE_FROM_CART } from '../../graphql/mutations';
import { useMutation } from '@apollo/react-hooks';
import './cartRow.scss';
import { IS_LOGGED_IN } from '../../graphql/queries';
const CartRow = props => {
    const [deleteFromCart] = useMutation(DELETE_FROM_CART, {
        update(cache, { data: { deleteFromCart }}){
            cache.writeQuery({
                query: IS_LOGGED_IN,
                data: { cart: deleteFromCart }
            })
        }
    });

    const deleteItemFromCart = () => {
        deleteFromCart({
            variables: { itemCartIdx: props.index, cartId: props.cartId }
        });
    }
    return (
        <div className="better-way">
            <div className="carts-row">
                <div className="row">
                    <img className="cart-row-img" src={props.imageUrl} />
                    <div className="prod-title-col">
                        <p className="cart-row-title" onClick={() => props.history.push(`/products/${props.productId}`)}>{props.title}</p>
                        <p className="delete-item" onClick={deleteItemFromCart}>Delete</p>
                    </div>
                </div>
                <p className="price-red-new">
                    {props.price}
                </p>
            </div>
            <div className="some-empty-space"></div>
        </div>
    )
};

export default withRouter(CartRow);