import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { ApolloConsumer } from "react-apollo";
import { FULL_USER, IS_LOGGED_IN } from "../../graphql/queries";
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
                  <h1 className="white">musicbox</h1>
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
                        <h1 className="account-dropdown-header">Your Account</h1>
                        <li>
                          <Link to="#">Your Orders</Link>
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
                </div>
              );
            } else {
              return (
                <div className="navBar">
                  <Link to="/login">Login</Link>
                  <br />
                  <Link to="/register">Register</Link>
                </div>
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default NavBar;
