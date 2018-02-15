import React from "react";
import ItemsBoard from "./ItemsBoard";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  update(info) {
    if (info.type == "actors") {
      this.actorBoard.update(info.index, "name", info.object.name);
      this.actorBoard.update(info.index, "direct", info.object.direct);
      this.actorBoard.update(
        info.index,
        "description",
        info.object.description
      );
    } else {
      this.UCBoard.update(info.index, "name", info.object.name);
      this.UCBoard.update(info.index, "description", info.object.description);
    }
  }

  render() {
    return (
      <div className="Board card-panel">
        <h2> Board</h2>
        <ItemsBoard
          type="actors"
          color="blue"
          showOnEditingArea={this.props.showOnEditingArea}
          onRef={ref => (this.actorBoard = ref)}
          storeData={this.props.storeData}
        />
        <ItemsBoard
          type="UCs"
          color="teal"
          showOnEditingArea={this.props.showOnEditingArea}
          onRef={ref => (this.UCBoard = ref)}
          storeData={this.props.storeData}
        />{" "}
      </div>
    );
  }
}
