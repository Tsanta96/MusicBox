import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { ApolloConsumer } from "react-apollo";
import {IS_LOGGED_IN } from "../../graphql/queries";
import SearchBar from '../SearchBar/SearchBar';
import './navbar.scss';
const NavBar = props => {
  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div></div>;
            if (data.isLoggedIn) {
              return (
                <div className="navbar">
                  <h1 className="white" onClick={() => props.history.push("/")}>musicbox</h1>
                  <SearchBar />
                  <div className="nav-user-name">
                    <p className="nav-user-only-name">{`Hello, ${data.name}`}</p>
                    <div className="row">
                      <p className="nav-account-header">Account</p>
                      <div>
                        <i className="arrow-grey left"></i>
                      </div>
                    </div>
                    <div className="relative-container">
                      <ul className="account-dropdown">
                        <h1 className="account-dropdown-header">
                          Your Account
                        </h1>
                        <li>
                          <Link to="#">Your Orders</Link>
                        </li>
                        <li>
                          <Link to="/upload">List a Product</Link>
                        </li>
                        <li>
                          <button
                            onClick={e => {
                              e.preventDefault();
                              localStorage.removeItem("auth-token");
                              client.writeData({ data: { isLoggedIn: false } });
                              props.history.push("/");
                            }}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="shopping-cart" onClick={() => props.history.push("/cart")}>
                    <p className="nav-number-items-in-cart">{data.cart ? data.cart.products.length.toString() : "0"}</p>
                    <span className="cart-icon"></span>
                  </div>
                  <p className="cart-label">Cart</p>
                </div>
              );
            } else {
              return (
                <div className="navbar">
                  <h1 className="white">musicbox</h1>
                  <SearchBar />
                  <div className="nav-user-name">
                    <p className="nav-user-only-name">Hello,</p>
                    <div className="row">
                      <p className="nav-account-header">Sign In</p>
                      <div>
                        <i className="arrow-grey left"></i>
                      </div>
                    </div>
                    <div className="relative-container">
                      <ul className="account-dropdown">
                        <h1 className="account-dropdown-header">
                          Welcome
                        </h1>
                        <li>
                          <Link to="/login"><div className="signin-btn">Sign In</div></Link>
                          <Link to="/register"><div className="register-btn">Register</div></Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="shopping-cart">
                    <p className="nav-number-items-in-cart">
                      0
                    </p>
                    <span className="cart-icon"></span>
                  </div>
                  <p className="cart-label">Cart</p>
                </div>
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default withRouter(NavBar);
