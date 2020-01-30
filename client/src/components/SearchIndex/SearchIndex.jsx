import React, { useState, useEffect } from 'react';
import {
  PRODUCTS_BY_CATEGORY_BY_NAME,
  FETCH_PRODUCTS
} from "../../graphql/queries";
import { useQuery } from "@apollo/react-hooks";

const SearchIndex = props => {
    // useEffect( async () => {
        
    //     console.log(props)
    // }, [props.match.params.category])

    const { loading: loading1, error: error1, data: data1 } = useQuery(PRODUCTS_BY_CATEGORY_BY_NAME, {
      variables: { name: "instruments" }
    });

    const { loading: loading2, error: error2, data: data2 } = useQuery(FETCH_PRODUCTS);

    console.log("all products", data2);
    console.log("categoryProducts", data1);
    return (
        <div>
            Hello World
        </div>
    )
}

export default SearchIndex;