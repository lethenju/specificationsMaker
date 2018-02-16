import React from "react";
import Editable from "./Editable";
import App from "../App";
import { renderActor } from "./RenderActor";
import { renderUC } from "./RenderUC";
import { actors, useCases } from "../StringAssets";

export default class EditingArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { render: false };
    this.renameElement = this.renameElement.bind(this);
    this.save = this.save.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  update(info) {
    if (info.command == "show") {
      this.setState({
        render: true,
        type: info.type,
        index: info.index,
        object: this.props.fetchData()[info.type].data[info.index]
      });
    } else {
      this.setState({ render: false });
    }
  }

  renameElement(newText) {
    const newState = this.state;
    newState.object.name = newText;
    this.setState(newState);

    let newData = this.props.fetchData()[this.state.type].data;
    newData[newState.index] = newState.object;
    this.props.storeData(this.state.type, newData);
    this.props.updateToBoard(this.state.type, newState.index);
  }
  save(event) {
    const newState = this.state;
    console.log(this.refs);

    // if it is a select multiple array
    if (newState.object[event.target.id] != null) {
      if (newState.object[event.target.id].constructor === Array) {
        newState.object[event.target.id] = [].slice
          .call(event.target.selectedOptions)
          .map(o => {
            return o.value;
          });
      } else {
        newState.object[event.target.id] = this.refs[event.target.id].value;
      }
    } else {
      newState.object[event.target.id] = this.refs[event.target.id].value;
    }
    this.setState(newState);
    let newData = this.props.fetchData()[this.state.type].data;
    newData[newState.index] = newState.object;
    this.props.storeData(this.state.type, newData);
    this.props.updateToBoard(this.state.type, newState.index);
  }
  render() {
    if (this.state.render) {
      if (this.state.type == actors()) {
        return renderActor(this);
      } else if (this.state.type == useCases()) {
        return renderUC(this);
      }
    } else {
      return (
        <div className="EditingArea card-panel col s8">
          <h2> Editing Area </h2>
        </div>
      );
    }
  }
}
