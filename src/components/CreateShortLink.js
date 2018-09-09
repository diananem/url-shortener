import React, { Component } from "react";

import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

const CREATE_SHORT_LINK_MUTATION = gql`
  mutation CreateLinkMutation($url: String!, $description: String!) {
    createLink(url: $url, description: $description) {
      id
    }
  }
`;

class CreateShortLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      description: ""
    };
  }

  createShortLink = async () => {
    const { url, description } = this.state;
    await this.props.createShortLinkMutation({
      variables: {
        url,
        description
      }
    });
  };

  handleChangeUrl = e => {
    this.setState({
      url: e.target.value
    });
  };

  handleChangeDescription = e => {
    this.setState({
      description: e.target.value
    });
  };

  render() {
    return (
      <div>
        <input
          id="url"
          type="text"
          value={this.state.url}
          placeholder="Link URL"
          onChange={this.handleChangeUrl}
        />
        <input
          id="description"
          type="text"
          value={this.state.description}
          placeholder="Link description"
          onChange={this.handleChangeDescription}
        />
        <button onClick={this.createShortLink}>Create</button>
      </div>
    );
  }
}
export default graphql(CREATE_SHORT_LINK_MUTATION, {
  name: "createShortLinkMutation"
})(withApollo(CreateShortLink));
