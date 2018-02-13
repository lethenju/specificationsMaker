import React from "react";
import ActorsBoard from "./ActorsBoard";
import UCBoard from "./UCBoard";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.focusOnEditingArea = this.focusOnEditingArea.bind(this);
    this.update = this.update.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  focusOnEditingArea(info) {
    this.props.showOnEditingArea(info);
  }
  update(info) {
    if (info.type == "actor") {
      this.actorBoard.renameActor(info.index, info.object.name);
    } else {
      alert("UC");
    }
  }
  render() {
    return (
      <div className="Board card-panel">
        <h2> Board</h2>
        <ActorsBoard showOnEditingArea={this.focusOnEditingArea} onRef={ref => this.actorBoard = ref} />
        <UCBoard showOnEditingArea={this.focusOnEditingArea} />{" "}
      </div>
    );
  }
}
