import React, { Component } from "react";
import LinkList from "./components/LinkList";
import CreateShortLink from "./components/CreateShortLink";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <h2>All links</h2>
          <LinkList />
        </div>
        <div>
          <h2>Create a short link</h2>
          <CreateShortLink />
        </div>
      </div>
    );
  }
}

export default App;
