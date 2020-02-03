import React from 'react';
import { FETCH_USER, FETCH_ORDERS, FIND_USER_CART } from '../../graphql/queries';
import { Query, Mutation, ApolloConsumer } from "react-apollo";
import { CREATE_ORDER } from '../../graphql/mutations';

const OrderDisplay = props => {{
    return (
        <ApolloConsumer>
            { cache => {
                const user = cache.readQuery({ query: FETCH_USER });
                const cart = cache.readQuery({ query: FIND_USER_CART, variables: { userId: user.currentUser }});
                debugger;
                return <Query 
                    query={FETCH_ORDERS}
                    variables={{userId: user.currentUser}}
                >
                    {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;
                        console.log(data);
                        return (
                            <Mutation mutation={CREATE_ORDER}>
                                {createOrder => (
                                    <div>
                                        <ul>
                                            {data.orders.map(order => 
                                                <li key={order}>
                                                    {order.products.map(product => 
                                                        <div>
                                                            <img src={product.imageUrl}/>
                                                            <p>{product.description}</p>
                                                            <span>{product.price}</span>
                                                        </div>
                                                    )}
                                                </li>
                                            )}
                                        </ul>
                                        <button onClick={() => createOrder({
                                            variables: {
                                                userId: user.currentUser
                                            }
                                        })}>Create Order</button>
                                    </div>
                                )}
                            </Mutation>
                        )
                    }}
                </Query> 
            }}
        </ApolloConsumer>
    )
}};

export default OrderDisplay;