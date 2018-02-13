import React from "react";
import ActorsBoard from "./ActorsBoard";
import UCBoard from "./UCBoard";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.focusOnEditingArea = this.focusOnEditingArea.bind(this);
  }
  focusOnEditingArea(info) {
    this.props.showOnEditingArea(info);
  }
  render() {
    return (
      <div className="Board card-panel">
        <h2> Board</h2>
        <ActorsBoard showOnEditingArea={this.focusOnEditingArea} />{" "}
        <UCBoard showOnEditingArea={this.focusOnEditingArea} />{" "}
      </div>
    );
  }
}
