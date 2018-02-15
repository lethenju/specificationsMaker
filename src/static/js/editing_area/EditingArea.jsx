import React from "react";
import Editable from "./Editable";
import App from "../App";
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

  renderActor() {
    return (
      <div className="EditingArea card-panel col s6">
        <h2> Editing Area </h2>
        <div className="no_pad_margin row">
          <h3 className="no_pad_margin col s3 right-align">Actor :</h3>
          <Editable
            className="no_pad_margin col s8"
            key={1}
            index={1}
            type="editable"
            rename={this.renameElement}
          >
            {this.state.object.name}
          </Editable>
        </div>
        <div className="divider" />
        <form>
          <label>
            Type
            <select
              className="browser-default"
              value={this.state.object.direct || "direct"}
              id="direct"
              onChange={this.save}
            >
              <option value="direct">Direct</option>
              <option value="indirect">Indirect</option>
            </select>
          </label>
          <div className="row">
            <label>
              Description
              <textarea
                className="col s12"
                name="textarea"
                id="description"
                ref="description"
                value={this.state.object.description || ""}
                onChange={this.save}
              />
            </label>
          </div>
        </form>
      </div>
    );
  }
  renderUC() {
    return (
      <div className="EditingArea  col s8">
        <h2> Editing Area </h2>
        <div className="row" className="no_pad_margin">
          <h3 className="no_pad_margin col s3 right-align">Use case :</h3>
          <Editable
            className="no_pad_margin col s8"
            key={1}
            index={1}
            type="editable"
            rename={this.renameElement}
          >
            {this.state.object.name}
          </Editable>
        </div>
        <div className="divider" />
        <form>
          <div className="row">
            <label>
              Description
              <textarea
                className="col s12"
                name="textarea"
                ref="description"
                id="description"
                value={this.state.object.description || ""}
                onChange={this.save}
              />
            </label>
          </div>

          <div className="row">
            <label>
              Main Actors
              <select
                multiple
                id="mainActors"
                className="browser-default"
                value={
                  this.state.object.mainActors.length != 0
                    ? this.state.object.mainActors
                    : this.props.fetchData().actors.data.length != 0
                      ? []
                      : ["Create an actor first"]
                }
                onChange={this.save}
              >
                {this.props
                  .fetchData()
                  .actors.data.map((object, i) => (
                    <option key={i}>{object.name}</option>
                  ))}
              </select>
            </label>
          </div>
          <div className="row">
            <label>
              Secondary Actors
              <select
                multiple
                className="browser-default"
                id="secondActors"
                value={
                  this.state.object.secondActors.length != 0
                    ? this.state.object.secondActors
                    : this.props.fetchData().actors.data.length != 0
                      ? []
                      : ["Create an actor first"]
                }
                onChange={this.save}
              >
                {this.props
                  .fetchData()
                  .actors.data.map((object, i) => (
                    <option key={i}>{object.name}</option>
                  ))}
              </select>
            </label>
          </div>
          <div className="row">
            <label>
              Preconditions
              <textarea
                className="col s12"
                name="textarea"
                id="preconditions"
                ref="preconditions"
                value={this.state.object.preconditions || ""}
                onChange={this.save}
              />
            </label>
          </div>
          <div className="row">
            <label>
              Minimal garanties
              <textarea
                className="col s12"
                name="textarea"
                id="minimalgaranties"
                ref="minimalgaranties"
                value={this.state.object.minimalgaranties || ""}
                onChange={this.save}
              />
            </label>
          </div>
          <div className="row">
            <label>
              Success garanties
              <textarea
                className="col s12"
                name="textarea"
                id="successgaranties"
                ref="successgaranties"
                value={this.state.object.successgaranties || ""}
                onChange={this.save}
              />
            </label>
          </div>
        </form>
      </div>
    );
  }
  render() {
    if (this.state.render) {
      if (this.state.type == actors()) {
        return this.renderActor();
      } else if (this.state.type == useCases()) {
        return this.renderUC();
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
