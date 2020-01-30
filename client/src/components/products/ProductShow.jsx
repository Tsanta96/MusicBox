import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import { FETCH_PRODUCT } from '../../graphql/queries';
const ProductShow = props => {
    const { loading: showLoading, error: showError, data: showData } = useQuery(FETCH_PRODUCT, {
        variables: { productId: props.match.params.productId }
    });
    console.log("This is showData", showData);
    if (showLoading){
        return <LoadingIcon />
    } else if (showError){
        return <div>Sorry there was an error</div>
    } else if (showData && Object.values(showData.product).length > 0){
        const { product } = showData;
        return (
          <div className="product-show">
            <img
              className="full-prod-img"
              src={product.imageUrl}
              alt="product image"
            />
            <div className="name-rating-description-column">
              <p className="full-prod-name">{product.name}</p>
              {product.seller && (
                <p className="seller-info">{`by ${product.seller}`}</p>
              )}
              <div className="ratings"></div>
              <div className="full-prod-price-red">
                <p className="full-prod-price-label">Price:</p>
                <p className="full-prod-price-nums">{`$${product.price}`}</p>
                <p className="full-prod-desc">{product.description}</p>
                <p className="full-prod-weight">{product.weight.toString()}</p>
              </div>
            </div>
            <div className="buy-box">
              <p className="In Stock."></p>
              <div className="prod-quantity-box"></div>
              <button className="add-to-cart-btn">Add to Cart</button>
              <button className="buy-btn">Buy Now</button>
            </div>
          </div>
        );
    } else {
        return <p>Sorry we don't have that product</p>
    }
    
};

export default ProductShow