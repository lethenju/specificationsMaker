import React from "react";
import Editable from "./Editable";

export default class EditingArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { render: false };
    this.renameElement = this.renameElement.bind(this);
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
        object: {
          name: info.name
        }
      });
    } else {
      this.setState({ render: false });
    }
  }

  renameElement(newText) {
    const newState = {
      render: this.state.render,
      type: this.state.type,
      index: this.state.index,
      object: {
        name: newText
      }
    };
    this.setState(newState);
    this.props.updateToBoard(newState);
  }

  renderActor() {
    return <div className="EditingArea card-panel col s6">
        <h2> Editing Area </h2>
        <row className="no_pad_margin">
          <h3 className="no_pad_margin col s3 right-align">Actor :</h3>
          <Editable className="no_pad_margin col s8" key={1} index={1} type="editable" rename={this.renameElement}>
            {this.state.object.name}
          </Editable>
        </row>
        <div className="divider" />
        <div class="section">
          <h5>Properties</h5>
          <table className="propertyTable highlight">
            <tbody>
              <tr>
                <td>Direct actor ?</td>
                <td>TODO</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>TODO</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>;
       
  }
  renderUC() {
    return (
      <div className="EditingArea card-panel col s8">
        <h2> Editing Area </h2>
        <row className="no_pad_margin">
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
        </row>
      </div>
    );
  }
  render() {
    if (this.state.render) {
      if (this.state.type == "actor") {
        return this.renderActor();
      } else if (this.state.type == "UC") {
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
