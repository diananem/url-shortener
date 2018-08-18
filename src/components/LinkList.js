import React, { Component } from "react";
import Link from "./Link";

// This links is for example for now
const ALL_LINKS = [
  {
    id: "1",
    hash: "ABC",
    url: "http://google.com",
    description: "Google shortlink"
  },
  {
    id: "2",
    hash: "DEF",
    url: "http://reactjs.org",
    description: "ReactJS shortlink"
  }
];

class LinkList extends Component {
  render() {
    return (
      <div>
        {ALL_LINKS.map(item => (
          <Link key={item.id} link={item} />
        ))}
      </div>
    );
  }
}

export default LinkList;
