import React from "react";
import ItemsBoard from "./ItemsBoard";
import { actors, useCases } from "../StringAssets";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.addUseCase = this.addUseCase.bind(this);
    this.board = { [actors()]: null, [useCases()]: null };
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  update(type, index) {
    this.board[type].update(
      index,
      "name",
      this.props.fetchData()[type].data[index].name
    );
  }
  addUseCase(name) {
    this.board[useCases()].addNamed(name);
  }

  render() {
    return (
      <div className="Board card-panel">
        <h2> Board</h2>
        <ItemsBoard
          type={actors()}
          color="blue"
          showOnEditingArea={this.props.showOnEditingArea}
          onRef={ref => (this.board[actors()] = ref)}
          storeData={this.props.storeData}
        />
        <ItemsBoard
          type={useCases()}
          color="teal"
          showOnEditingArea={this.props.showOnEditingArea}
          onRef={ref => (this.board[useCases()] = ref)}
          storeData={this.props.storeData}
        />{" "}
      </div>
    );
  }
}
