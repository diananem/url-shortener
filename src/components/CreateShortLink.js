import React, { Component } from "react";

class CreateShortLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      description: ""
    };
  }

  createShortLink = () => {};

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
    console.log(this.state.url);
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
        <button onClick={this.createShortLink}>Cteate</button>
      </div>
    );
  }
}

export default CreateShortLink;
