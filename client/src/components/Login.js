import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { LOGIN_USER } from '../graphql/mutations';
import '../stylesheets/auth.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errors: ""
        };
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    updateCache(client, {data}) {
        // here we can write directly to our cache with our returned mutation data
        client.writeData({
            data: { isLoggedIn: data.login.loggedIn, currentUser: data.login._id,
            name: data.login.name }
        });
    }

    renderErrors(errors) {
        if (errors === "") {
            return (
                <div></div>
            )
        } else {
            return (
                <ul className="errors-box">
                    {errors.map((err, idx) => (
                        <li key={idx}>
                            {err}
                        </li>
                    ))}
                </ul>
            )
        }
    }
    
    render() {
        return (
        <Mutation
            mutation={LOGIN_USER}
            onCompleted={data => {
                const { token } = data.login;
                localStorage.setItem("auth-token", token);
                this.props.history.push("/");
            }}
            onError={({ graphQLErrors }) => {
                this.setState({errors: Object.values(JSON.parse(graphQLErrors[0].message.split(",")))})
                this.renderErrors(this.state.errors);
            }}
            update={(client, data) => this.updateCache(client, data)}
        >
            {loginUser => (
            <div>
                <h1 className="auth-logo">musicbox</h1>
                <div>
                    {this.renderErrors(this.state.errors)}
                </div>
                <div className="entire-login-container">
                    <div className = "login-form-container">
                        <form className="auth-form"
                        onSubmit={e => {
                            e.preventDefault();
                            loginUser({
                            variables: {
                                email: this.state.email,
                                password: this.state.password
                            }
                            });
                        }}
                        >
                        <p className="create-account">Sign-In</p>
                        <label className="input-field-names">E-mail
                            <input id="sign-in-email"
                                value={this.state.email}
                                onChange={this.update("email")}
                            />
                        </label>
                        <label className="input-field-names">Password
                            <input
                                value={this.state.password}
                                onChange={this.update("password")}
                                type="password"
                            />
                        </label>
                        <button className="auth-submit" type="submit">Sign In</button>
                        <p className="login-music-box-terms">By creating an account, you agree to MusicBox's Conditions of Use and Privacy Notice.</p>
                        </form>
                    </div>
                    <div className="new-to-musicbox">
                        <h5 className="new-to-musicbox-text">New to MusicBox?</h5>
                    </div>
                    <button className="create-your-account-btn" type="submit" onClick={() => this.props.history.push("/register")}>Create your MusicBox account</button>
                    <button className="demo-user-btn" onClick={e => {
                        e.preventDefault();
                        loginUser({
                            variables: {
                                email: 'reilly@musicbox.com',
                                password: 'reilly123'
                            }
                        })
                    }}>Demo User</button>
                </div>
            </div>
            )}
        </Mutation>
        );
    }
}

export default Login;