import React from "react";
import ActorsBoard from "./ActorsBoard";
import UCBoard from "./UCBoard";

export default class Board extends React.Component {
  render() {
    return (
      <div className="Board card-panel">
        <ActorsBoard /> <UCBoard />{" "}
      </div>
    );
  }
}
