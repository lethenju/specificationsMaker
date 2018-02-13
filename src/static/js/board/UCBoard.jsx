import React from "react";
import Paragraph from "./Paragraph";

export default class UCBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { UCs: [] };
    this.addUseCase = this.addUseCase.bind(this);
    this.removeUseCase = this.removeUseCase.bind(this);
    this.focusUseCase = this.focusUseCase.bind(this);
    this.renameUseCase = this.renameUseCase.bind(this);
    this.eachUseCase = this.eachUseCase.bind(this);
  }

  addUseCase() {
    let newUCs = this.state.UCs;
    newUCs.push("New Use Case");
    this.setState({ UCs: newUCs });
  }

  removeUseCase(i) {
    let newUCs = this.state.UCs;
    newUCs.splice(i, 1);
    this.setState({ UCs: newUCs });
  }

  renameUseCase(newText, i) {
    let newUCs = this.state.UCs;
    newUCs[i] = newText;
    this.setState({ UCs: newUCs });
  }

  focusUseCase(info) {
    info.name = this.state.UCs[info.index];
    this.props.showOnEditingArea(info);
  }

  eachUseCase(text, i) {
    return (
      <Paragraph
        key={i}
        index={i}
        type="UC"
        rename={this.renameUseCase}
        remove={this.removeUseCase}
        showOnEditingArea={this.focusUseCase}
      >
        {text}
      </Paragraph>
    );
  }

  render() {
    return (
      <div className="UCboard card-panel teal lighten-4">
        <h2> Use Cases </h2>
        <div>{this.state.UCs.map(this.eachUseCase)}</div>
        <button
          onClick={this.addUseCase}
          className="waves-effect waves-light btn"
        >
          Add new
        </button>
      </div>
    );
  }
}
