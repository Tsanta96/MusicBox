import { FETCH_PRODUCTS } from '../../graphql/queries';
import { ADD_TO_CART } from '../../graphql/mutations';
import { Query, Mutation } from "react-apollo";
import AddToCart from '../cart/AddToCart';
import React from 'react';

export default class ProductIndex extends React.Component {
    render(){
        return (
        <Query query={FETCH_PRODUCTS}>
            {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
    
            return (
                <ul>
                {data.products.map(product => (
                    <li key={product._id}>
                        <span>{product.name}</span>
                        <AddToCart productId={product._id} price={product.price} />
                    </li>
                ))}
                </ul>
            );
            }}
        </Query>
        );
    }
};