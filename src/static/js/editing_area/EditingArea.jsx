import React from "react";
import Editable from "./Editable";

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
      if (info.type == "Actors") {
        this.setState({
          render: true,
          type: info.type,
          index: info.index,
          object: info.object
        });
      } else if (info.type == "Use Cases") {
        this.setState({
          render: true,
          type: info.type,
          index: info.index,
          object: info.object
        });
      }
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
  save(){

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
        <div className="switch">
          <p> Actor's type :</p>
          <label>
            Indirect
            <input type="checkbox" ref="isDirect" defaultValue={this.state.object.direct} />
            <span className="lever" />
            Direct
          </label>
        </div>
        <p> Description :</p>
        <div className="row">
          <textarea className="col s12" name="textarea" ref="description" defaultValue={this.state.object.description}>
            {this.state.object.description}
          </textarea>
        </div>
        <button onClick={this.save} className="waves-effect waves-light btn">
          Save
        </button>
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
}
