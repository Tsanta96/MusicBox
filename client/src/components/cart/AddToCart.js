import { ADD_TO_CART } from '../../graphql/mutations';
import { FIND_USER_CART, FETCH_USER } from '../../graphql/queries';
import { Query, Mutation, ApolloConsumer } from "react-apollo";
import React from 'react';

const AddToCart = props => {{
    return (
        <ApolloConsumer>
            { cache => {
                const user = cache.readQuery({ query: FETCH_USER });
                return <Query 
                    query={FIND_USER_CART}
                    variables={{userId: user.currentUser}}
                >
                    {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;
                        return (
                            <Mutation mutation={ADD_TO_CART}>
                                {addToCart => (
                                    <button onClick={() => addToCart({
                                        variables: {
                                            productId: props.productId,
                                            cartId: data.cart._id
                                        }
                                    })}>Add To Cart</button>
                                )}
                            </Mutation>
                        )
                    }}
                </Query>
        }}
        </ApolloConsumer>
    )
}};

export default AddToCart;