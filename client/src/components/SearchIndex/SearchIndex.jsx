import React, { useState, useEffect } from 'react';
import {
  PRODUCTS_BY_CATEGORY_BY_NAME,
  FETCH_PRODUCTS
} from "../../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import SearchList from './SearchList';
const SearchIndex = props => {
    const { loading: loading1, error: error1, data: data1 } = useQuery(PRODUCTS_BY_CATEGORY_BY_NAME, {
      variables: { name: props.match.params.category }
    });

    const { loading: loading2, error: error2, data: data2 } = useQuery(FETCH_PRODUCTS);
    console.log("all products", data2);
    if (loading1 || loading2){
        return (<LoadingIcon />);
    } else if (data1 && data1.categoryByName.length > 0){
        return (
            <SearchList products={data1.categoryByName[0].products}/>
        )
    } else {
      if (data2 && data2.products.length > 0){
        return (
          <SearchList products={data2.products} />
        )
      } else {
        return <div></div>;
      }
    }
}

export default SearchIndex;