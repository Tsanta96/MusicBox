import React from 'react';
import { Query } from "react-apollo";
import { FETCH_PRODUCTS } from '../graphql/queries';

class ProductIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Query query={FETCH_PRODUCTS}>
            {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;

                return (
                <ul>
                    {data.products.map(product => (
                    <li key={product._id}>{product.name}</li>
                    ))}
                </ul>
                );
            }}
            </Query>
        );
    }
}

export default ProductIndex;