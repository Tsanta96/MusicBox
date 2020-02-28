import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import { FETCH_PRODUCT, IS_LOGGED_IN, FIND_USER_CART } from '../../graphql/queries';
import { ADD_TO_CART } from '../../graphql/mutations';
import { useMutation } from '@apollo/react-hooks';
import "./productShow.scss";
const ProductShow = props => {
    const { loading: showLoading, error: showError, data: showData } = useQuery(FETCH_PRODUCT, {
        variables: { productId: props.match.params.productId }
    });
  const { loading: loggedInLoading, error: loggedInError, data: isLoggedIn } = useQuery(IS_LOGGED_IN)
  const [addToCart] = useMutation(ADD_TO_CART, {
    update(cache, {data: { addToCart }}){
      cache.writeQuery({
        query: IS_LOGGED_IN,
        data: { cart: addToCart }
      })
    }
  });

  const handleAddToCart = () => {
    if (isLoggedIn.isLoggedIn) {
      addToCart({ variables: { productId: props.match.params.productId, cartId: isLoggedIn.cart._id }})
      .then(() => props.history.push("/newItems")).catch(e => console.log(e));
    } else {
      props.history.push('/login');
    }
  }

  const handleBuyNow = () => {
    if (isLoggedIn.isLoggedIn) {
      let buyNowWarning = document.getElementById('buy-now-warning');
      buyNowWarning.classList.remove('warning-hidden');
      buyNowWarning.classList.add('not-functional-warning');
    } else {
      props.history.push('/login');
    }
  }

  const ifLoggedIn = () => {
    console.log("isLoggedIn?", isLoggedIn.isLoggedIn);
  }

  const closeWarning = () => {
    let buyNowWarning = document.getElementById('buy-now-warning');
    buyNowWarning.classList.remove('not-functional-warning');
    buyNowWarning.classList.add('warning-hidden');
  }

    if (showLoading || loggedInLoading){
        return <LoadingIcon />
    } else if (showError){
        return <div>Sorry there was an error</div>
    } else if (showData && Object.values(showData.product).length > 0){
        const { product } = showData;
        return (
          <div className="product-show">
            {ifLoggedIn()}
            <img
              className="full-prod-img"
              src={product.imageUrl}
              alt="product image"
            />
            <div className="name-rating-description-column">
              <p className="full-prod-name">{product.name}</p>
              <div className="one-em"></div>
              {product.seller && (
                <div className="row">
                  <p className="prod-show-by">by</p>
                  <p className="seller-info">{`${product.seller.name.toUpperCase()}`}</p>
                </div>
              )}
              <div className="ratings"></div>
              <div className="full-prod-price-red">
                <p className="full-prod-price-label">Price:</p>
                <p className="full-prod-price-nums">{`$${product.price}`}</p>
              </div>
              <p className="desc-label">Description:</p>
              <p className="full-prod-desc">{product.description}</p>
              <p className="desc-label">Weight:</p>
              <p className="full-prod-weight">{`${product.weight.toString()} lbs.`}</p>
            </div>
            <div className="buy-box">
              <p className="in-stock">In Stock</p>
              <div className="prod-quantity-box"></div>
              <div className="icon-btn">
                <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
                <div className="buy-cart-icon"></div>
              </div>

              <div className="icon-btn">
                <button className="buy-btn" onClick={handleBuyNow}>Buy Now</button>
                <div className="buy-icon"></div>
                <div id="buy-now-warning" className="warning-hidden">
                  <p>In Progress</p>
                  <span className="close-warning" onClick={closeWarning}>x</span>
                </div>
              </div>
            </div>
          </div>
        );
    } else {
        return <p>Sorry we don't have that product</p>
    }
    
};

export default ProductShow