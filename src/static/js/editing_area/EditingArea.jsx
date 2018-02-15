import React from "react";
import Editable from "./Editable";
import App from "../App";
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
        object: info.object
      });
    } else {
      this.setState({ render: false });
    }
  }

  renameElement(newText) {
    const newState = this.state;
    newState.object.name = newText;
    this.setState(newState);
    this.props.updateToBoard(newState);
  }
  save(event) {
    const newState = this.state;
    newState.object.description = this.refs.description.value;
    if (this.state.type === "actors") {
      newState.object.direct = event.target.value;
    } else if (this.state.type === "UCs") {
      newState.object.mainActors = event.target.value;
      newState.object.preconditions = this.refs.preconditions.value;
      newState.object.minimalgaranties = this.refs.minimalgaranties.value;
      newState.object.successgaranties = this.refs.successgaranties.value;
    }
    this.setState(newState);
    this.props.updateToBoard(newState);
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
                value={this.state.object.description || ""}
                onChange={this.save}
              />
            </label>
          </div>

          <div className="row">
            <label>
              Main Actors
              <select
                className="browser-default"
                value={
                  this.state.object.mainActors ||
                  this.props.fetchData().actors.data[0].name
                }
                onChange={this.save}
              >
                {this.props
                  .fetchData()
                  .actors.data.map((object, i) => (
                    <option value={object.name}>{object.name}</option>
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
      if (this.state.type == "actors") {
        return this.renderActor();
      } else if (this.state.type == "UCs") {
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
