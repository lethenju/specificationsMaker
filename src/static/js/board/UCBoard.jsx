import React from "react";
import UseCase from "./UseCase";
export default class UCBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { UCs: ["My first Use Case"] };
    this.addUseCase = this.addUseCase.bind(this);
    this.removeUseCase = this.removeUseCase.bind(this);
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

  eachUseCase(text, i) {
    return (
      <UseCase
        key={i}
        index={i}
        renameUC={this.renameUseCase}
        removeUC={this.removeUseCase}
      >
        {text}
      </UseCase>
    );
  }

  render() {
    return (
      <div className="UCboard card-panel teal lighten-4">
        <h2> Use Cases </h2>
        <div>{this.state.UCs.map(this.eachUseCase)}</div>
        <button onClick={this.addUseCase}>Add new</button>
      </div>
    );
  }
}
