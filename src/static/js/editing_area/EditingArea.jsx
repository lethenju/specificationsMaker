import React from "react";
import Editable from "./Editable";

export default class EditingArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { render: false };
    this.renameElement = this.renameElement.bind(this);
    this.save = this.save.bind(this);
    this.noNull = this.noNull.bind(this);
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

    if (this.state.type === "Actors") {
      newState.object.direct = event.target.value;
    }
    this.setState(newState);
    this.props.updateToBoard(newState);
  }

  renderActor() {
    return <div className="EditingArea card-panel col s6">
        <h2> Editing Area </h2>
        <div className="no_pad_margin row">
          <h3 className="no_pad_margin col s3 right-align">Actor :</h3>
          <Editable className="no_pad_margin col s8" key={1} index={1} type="editable" rename={this.renameElement}>
            {this.state.object.name}
          </Editable>
        </div>
        <div className="divider" />
        <form>
          <label>
            Actor's type
            <select className="browser-default" value={this.state.object.direct || "direct"} onChange={this.save}>
              <option value="direct">Direct</option>
              <option value="indirect">Indirect</option>
            </select>
          </label>
          <p> Description :</p>
          <div className="row">
            <textarea className="col s12" name="textarea" ref="description" value={this.state.object.description || ""} onChange={this.save} />
          </div>
        </form>
      </div>;
  }
  renderUC() {
    return (
      <div className="EditingArea card-panel col s8">
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
      </div>
    );
  }
  render() {
    if (this.state.render) {
      if (this.state.type == "Actors") {
        return this.renderActor();
      } else if (this.state.type == "Use Cases") {
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

  noNull(value) {
    if (value == null) {
      return "";
    }
    return value;
  }
}
