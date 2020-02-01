import React, { useState, useEffect } from 'react';
import {
  PRODUCTS_BY_CATEGORY_BY_NAME,
  FETCH_PRODUCTS,
  FETCH_PRODUCT_BY_NAME_OR_DESCRIPTION
} from "../../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import SearchList from './SearchList';
const SearchIndex = props => {
    const { loading: loading1, error: error1, data: data1 } = useQuery(PRODUCTS_BY_CATEGORY_BY_NAME, {
      variables: { name: props.match.params.category }
    });

    const { loading: loading2, error: error2, data: data2 } = useQuery(FETCH_PRODUCTS);

    const { loading: loading3, error: error3, data: data3 } = useQuery(FETCH_PRODUCT_BY_NAME_OR_DESCRIPTION, {
      variables: { searchText: props.match.params.category }
    })

    console.log("this is data3", data3);
    if (loading1 || loading2 || loading3){
        return (<LoadingIcon />);
    } else if (data1 && data1.categoryByName.length > 0){
        return (
            <SearchList products={data1.categoryByName[0].products}/>
        )
    } else {
      if (data3 && data3.productByNameOrDescription.length > 0){
        return (
          <SearchList products={ data3.productByNameOrDescription } />
        )
      } else {
        if (data2 && data2.products.length > 0){
          return (
            <SearchList products={data2.products} />
          )
        }
      }
    }
}

export default SearchIndex;