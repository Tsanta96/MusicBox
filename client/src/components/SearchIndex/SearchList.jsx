import React from 'react';
import ProductThumbail from '../products/ProductThumbnail';
import './searchList.scss';
const SearchList = props => {
    const { products } = props;
    return (
        <div className="search-list">
            {
                products.map(product => 
                    {
                        let name = product.name.length > 150 ? product.name.slice(0,138) + "..." : product.name;
                        console.log(name);
                        return <ProductThumbail 
                            imageUrl={product.imageUrl ? product.imageUrl : ""}
                            name={name}
                            price={product.price.toString()}
                            id={product._id}
                            key={product._id}
                        />
                    }
                )
            }
        </div>
    )
}
export default SearchList;