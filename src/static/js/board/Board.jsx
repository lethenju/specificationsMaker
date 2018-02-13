import React from "react";
import ActorsBoard from "./ActorsBoard";
import UCBoard from "./UCBoard";

export default class Board extends React.Component {
  render() {
    return (
      <div className="Board card-panel">
        <h2> Specification Board</h2>
        <ActorsBoard showOnEditingArea={this.props.showOnEditingArea} />{" "}
        <UCBoard />{" "}
      </div>
    );
  }
}
