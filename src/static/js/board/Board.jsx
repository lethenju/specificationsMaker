import React from "react";
import ItemsBoard from "./ItemsBoard";

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
      this.actorBoard.rename(info.index, info.object.name);
    } else {
      this.UCBoard.rename(info.index, info.object.name);
    }
  }
  render() {
    return (
      <div className="Board card-panel">
        <h2> Board</h2>
        <ItemsBoard
          type="Actors"
          color="blue"
          showOnEditingArea={this.focusOnEditingArea}
          onRef={ref => (this.actorBoard = ref)}
        />
        <ItemsBoard
          type="Use Cases"
          color="teal"
          showOnEditingArea={this.focusOnEditingArea}
          onRef={ref => (this.UCBoard = ref)}
        />{" "}
      </div>
    );
  }
}
