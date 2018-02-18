/** @file App.jsx
 *  @author Julien LE THENO
 *  @desc Index of the React application. Handles the biggest components on screen :
 * the board and the editing area, and the communication between them.
 */

import React from "react";
import Board from "./board/Board";
import EditingArea from "./editing_area/EditingArea";
import { actors, useCases } from "./StringAssets";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.showOnEditingArea = this.showOnEditingArea.bind(this);
    this.updateToBoard = this.updateToBoard.bind(this);
    this.storeData = this.storeData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = { [actors()]: { data: [] }, [useCases()]: { data: [] } };
  }

  storeData(type, data) {
    let newState = this.state;
    newState[type].data = data;
    this.setState(newState);
    //console.log(this.state);
  }
  fetchData() {
    return this.state;
  }
  showOnEditingArea(info) {
    this.editingArea.update(info);
  }
  updateToBoard(type, index) {
    this.specBoard.update(type, index);
  }
  render() {
    return (
      <div className="app">
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">
                Specification Maker
              </a>
            </div>
          </nav>
        </div>
        <div className="MainBoard row">
          <div className="col s4">
            <Board
              showOnEditingArea={this.showOnEditingArea}
              onRef={ref => (this.specBoard = ref)}
              storeData={this.storeData}
              fetchData={this.fetchData}
            />
          </div>
          <div className="col s8">
            <EditingArea
              updateToBoard={this.updateToBoard}
              onRef={ref => (this.editingArea = ref)}
              storeData={this.storeData}
              fetchData={this.fetchData}
            />
          </div>
        </div>
      </div>
    );
  }
}
