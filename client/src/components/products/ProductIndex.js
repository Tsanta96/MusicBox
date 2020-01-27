import { FETCH_PRODUCTS } from '../../graphql/queries';
import { ADD_TO_CART } from '../../graphql/mutations';
import { Query, Mutation } from "react-apollo";
import React from 'react';

export default class ProductIndex extends React.Component {
    addToCart(){
        return (
        <Mutation mutation={ADD_TO_CART}>
            {addToCart => (
                <p onClick={
                    addToCart({
                        variables: {
                            productId: '',
                            cartId: ''
                        }
                    })
                }>
                    Add to Cart
                </p>
            )}
        </Mutation>
        )
    }

    render(){
        debugger;
        return (
        <Query query={FETCH_PRODUCTS}>
            {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            console.log(data);
    
            return (
                <ul>
                {data.products.map(product => (
                    <li key={product._id}>
                        <span>{product.name}</span>
                        <p>Add to Cart</p>
                    </li>
                ))}
                </ul>
            );
            }}
        </Query>
        );
    }
};