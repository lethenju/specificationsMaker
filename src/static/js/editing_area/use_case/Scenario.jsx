import React from "react";
import ScenarioStep from "./ScenarioStep";
export default class Scenario extends React.Component {
  constructor(props) {
    super(props);
    this.state = { steps: this.props.fetchScenario() };
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.add = this.add.bind(this);
  }
  add() {
    let newSteps = this.state.steps;
    newSteps.push({
      key: this.state.steps.length,
      actor: null,
      action: null
    });
    //this.props.storeData(this.props.type, newStep);
    this.setState({ steps: newSteps });
  }

  remove(i) {
    let newSteps = this.state.steps;
    newSteps.splice(i, 1);
    //this.props.storeData(this.props.type, newStep);
    this.setState({ paragraphs: newSteps });
  }

  update(i, field, newText) {
    let newSteps = this.state.steps;
    newSteps[i][field] = newText;
    this.setState({ steps: newSteps });
    this.props.storeScenario(newSteps);
  }

  render() {
    return (
      <div id="scenario" className="card-panel red lighten-1">
        <h3 className="whiteText"> Scenario </h3>
        <div>
          {this.state.steps.map((object, i) => (
            <ScenarioStep
              key={i}
              index={i}
              update={this.update}
              remove={this.remove}
              fetchData={this.props.fetchData}
            >
              {object}
            </ScenarioStep>
          ))}
        </div>
        <button
          onClick={this.add}
          className="waves-effect waves-light btn-flat"
        >
          Add new
        </button>
      </div>
    );
  }
}
