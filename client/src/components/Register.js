import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Mutation, ApolloConsumer } from 'react-apollo';
import { REGISTER_USER, CREATE_CART } from '../graphql/mutations';
import '../stylesheets/auth.css';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: "",
            refresh: 1
        };
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    updateCache(client, {data}) {
        client.writeData({
            data: { isLoggedIn: data.register.loggedIn }
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
        <ApolloConsumer>
            {client => 
                <Mutation
                    mutation={REGISTER_USER}
                    onCompleted={data => {
                        const { token } = data.register;
                        localStorage.setItem("auth-token", token);
                        // client
                        //     .mutate({mutation: CREATE_CART, variables: {userId: data.register._id}})
                        //     .then(({data2}) => {
                        //         console.log(data);
                        //         console.log(data2);
                        //         client.writeData({
                        //             data: {
                        //                 cart: {
                        //                     user: data.register._id
                        //                 }
                        //             }
                        //         })
                        //     })
                        this.props.history.push("/");
                    }}
                    onError={({ graphQLErrors }) => {
                        this.setState({errors: Object.values(JSON.parse(graphQLErrors[0].message.split(",")))})
                        this.renderErrors(this.state.errors);
                    }}
                    update={(client, data) => this.updateCache(client, data)}
                >
                    {registerUser => (
                    <div>
                        <h1 className="auth-logo">musicbox</h1>
                        <div>
                            {this.renderErrors(this.state.errors)}
                        </div>
                        <div className="form-container">
                            <form className="auth-form"
                            onSubmit={e => {
                                e.preventDefault();
                                registerUser({
                                    variables: {
                                        name: this.state.name,
                                        email: this.state.email,
                                        password: this.state.password,
                                        password2: this.state.password2
                                    }
                                });
                            }}
                            >
                            <p className="create-account">Create account</p>
                            <label className="input-field-names">Your name
                                <br></br>
                                <input
                                    value={this.state.name}
                                    onChange={this.update("name")}
                                />
                            </label>
                            <label className="input-field-names"> Email
                                <br></br>
                                <input
                                    value={this.state.email}
                                    onChange={this.update("email")}
                                />
                            </label>
                            <label className="input-field-names"> Password
                                <br></br>
                                <input
                                    value={this.state.password}
                                    onChange={this.update("password")}
                                    type="password"
                                    placeholder="At least 8 characters"
                                />
                                <div className="password-subtext">
                                    <i className="fa fa-info-circle"></i>
                                    <p className="password-note">Passwords must be at least 8 characters.</p>
                                </div>
                            </label>
                            <label className="input-field-names"> Re-enter Password
                                <br></br>
                                <input
                                    value={this.state.password2}
                                    onChange={this.update("password2")}
                                    type="password"
                                />
                            </label>
                            <button className="auth-submit" type="submit">Create your MusicBox account</button>
                            <p className="music-box-terms">By creating an account, you agree to MusicBox's Conditions of Use and Privacy Notice.</p>
                            <p className="redirect">Already have an account? <Link to="/login" className="sign-in-link">Sign-In</Link></p>
                            </form>
                        </div>
                    </div>
                    )}
                </Mutation>
            }
        </ApolloConsumer>
        );
    }
}

export default Register;