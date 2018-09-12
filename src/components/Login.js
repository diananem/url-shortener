import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id
      token
    }
  }
`;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  login = async () => {
    const { email, password } = this.state;
    try {
      const result = await this.props.authenticateUserMutation({
        variables: {
          email,
          password
        }
      });

      // Store the ID and token in local storage.
      localStorage.setItem("SHORTLY_ID", result.data.authenticateUser.id);
      localStorage.setItem("SHORTLY_TOKEN", result.data.authenticateUser.token);
      this.props.history.push("/");
    } catch (err) {
      // TODO: Handle errors properly here.
      console.error(err);
    }
  };
  handleChangeEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  handleChangePass = e => {
    this.setState({
      password: e.target.value
    });
  };

  render() {
    return (
      <div>
        <h2>Try to login</h2>
        <input
          id="email"
          type="text"
          value={this.state.email}
          placeholder="Email"
          onChange={this.handleChangeEmail}
        />
        <br />
        <input
          id="password"
          type="password"
          value={this.state.password}
          placeholder="Password"
          onChange={this.handleChangePass}
        />
        <br />
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

export default graphql(AUTHENTICATE_USER_MUTATION, {
  name: "authenticateUserMutation"
})(Login);
