import React from 'react';
import './productThumbnail.scss';
const ProductThumbNail = props => {
    const priceFormat = price => {
        const priceSplit = price.split(".");
        return (
            <div className="product-row-up">
                <p className="product-dollar-sign">$</p>
                <p className="first-two-price">{priceSplit[0]}</p>
                <p className="last-two-price">{priceSplit[1] ? priceSplit[1] : ""}</p>
            </div>
        )
    };
    return (
      <div className="product-thumbnail">
        {props.imageUrl && (
          <div className="product-img-container">
            <img
              className="img-thumbnail"
              src={props.imageUrl}
              alt="product image"
            />
          </div>
        )}
        <p className="product-thumb-name">{props.name}</p>
        <div className="product-rating"></div>
        {priceFormat(props.price)}
        <div className="empty-height"></div>
      </div>
    );
}

export default ProductThumbNail;