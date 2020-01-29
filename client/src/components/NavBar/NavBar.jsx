import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { ApolloConsumer } from "react-apollo";
import { IS_LOGGED_IN, FULL_USER } from "../../graphql/queries";
import SearchBar from '../SearchBar/SearchBar';
import './navbar.scss';
const NavBar = props => {
  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            if (data.isLoggedIn) {
              return (
                <div className="navbar">
                  <h1 className="white">musicbox</h1>
                  <SearchBar />
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
