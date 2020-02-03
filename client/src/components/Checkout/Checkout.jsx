import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { IS_LOGGED_IN } from '../../graphql/queries';
import './checkout.scss';
const Checkout = props => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    if (loading) {
        return <div>Loading</div>
    } else if (error){
        return <div>Sorry there is an error...</div>
    } else if (data.name){
        return (
            <div className="checkout">
                <form className="checkout-form">
                    <h1 className="shipping-address-form-header">
                        Enter a shipping address
                </h1>
                    <label htmlFor="full_name">Full name:</label>
                    <input id="full_name" type="text" value={data.name} />

                    <label htmlFor="addrs_line1">Address line 1:</label>
                    <input 
                    id="addrs_line1" 
                    type="text"
                    placeholder="Street address, P.O. box, company name, c/o"/>

                    <label htmlFor="addrs_line2">Address line2:</label>
                    <input
                        id="addrs_line2"
                        type="text"
                        placeholder="Apartment, suite, unit, building floor, etc." />

                    <label htmlFor="city">City:</label>
                    <input id="city" type="text"/>

                    <label htmlFor="state">State/Province/Retion:</label>
                    <input type="text" id="state"/>

                    <label htmlFor="zip">ZIP:</label>
                    <input type="text" id="zip"/>
                </form>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
    
}

export default Checkout;