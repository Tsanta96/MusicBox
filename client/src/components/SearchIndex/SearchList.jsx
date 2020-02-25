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
                name={product.name.length > 150 ? product.name.split(0,147) + "..." : product.name}
                price={product.price.toString()}
                id={product._id}
                key={product._id}
                />)
            }
        </div>
    )
}
export default SearchList;