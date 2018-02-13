import React from "react";

export default class EditingArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false
    };
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
      this.setState({ render: false});
    }
  }

  renderActor() {
    return (
      <div className="EditingArea card-panel">
        <h2> Editing Area </h2>
        <h3> Actor : {this.state.object.name} </h3>
      </div>
    );
  }
  renderUC() {
    return (
      <div className="EditingArea card-panel">
        <h2> Editing Area </h2>
        <h3> Use Case : {this.state.object.name} </h3>
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
        <div className="EditingArea card-panel">
          <h2> Editing Area </h2>
        </div>
      );
    }
  }
}
