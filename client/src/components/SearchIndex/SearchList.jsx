import React from 'react';
import ProductThumbail from '../products/ProductThumbnail';
import './searchList.scss';
const SearchList = props => {
    const { products } = props;
    return (
        <div className="search-list">
            {
                products.map(product => 
                <ProductThumbail 
                imageUrl={product.imageUrl ? product.imageUrl : ""}
                name={product.name}
                price={product.price.toString()}
                />)
            }
        </div>
    )
}
export default SearchList;