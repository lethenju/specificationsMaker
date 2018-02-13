import React from "react";
import Board from "./board/Board";
import EditingArea from "./editing_area/EditingArea";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.showOnEditingArea = this.showOnEditingArea.bind(this);
    this.updateToBoard = this.updateToBoard.bind(this);
  }

  showOnEditingArea(info) {
    this.editingArea.update(info);
  }
  updateToBoard(info) {
    this.specBoard.update(info);
  }
  render() {
    return (
      <div className="app">
        <nav>
          <div class="nav-wrapper">
            <a href="#" class="brand-logo">
              Specification Maker
            </a>
          </div>
        </nav>
        <div className="MainBoard row">
          <div className="col s4">
            <Board
              showOnEditingArea={this.showOnEditingArea}
              onRef={ref => (this.specBoard = ref)}
            />
          </div>
          <div className="col s8">
            <EditingArea
              updateToBoard={this.updateToBoard}
              onRef={ref => (this.editingArea = ref)}
            />
          </div>
        </div>
      </div>
    );
  }
}
