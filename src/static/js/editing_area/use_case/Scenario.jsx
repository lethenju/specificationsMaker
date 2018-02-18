import React from "react";
import ScenarioStep from "./ScenarioStep";
export default class Scenario extends React.Component {
  constructor(props) {
    super(props);
    this.state = { steps: []};
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.add = this.add.bind(this);
  }
  add() {
    let newSteps = this.props.fetchScenario();
    newSteps.push({
      key: this.state.steps.length,
      actor: null,
      action: null
    });
    //this.props.storeData(this.props.type, newStep);
    this.setState({ steps: newSteps });
    this.props.storeScenario(newSteps);
  }

  remove(i) {
    let newSteps = this.props.fetchScenario();
    
    newSteps.map((step, j) => {
      if (j > i) {
        step.key--;
      }
    });
    newSteps.splice(i, 1);
    //this.props.storeData(this.props.type, newStep);
    this.setState({ steps: newSteps });
    this.props.storeScenario(newSteps);
  }

  update(i, field, newText) {
    let newSteps = this.props.fetchScenario();
    newSteps[i][field] = newText;
    this.setState({ steps: newSteps });
    this.props.storeScenario(newSteps);
  }

  render() {
    return <div id="scenario" className="card-panel red lighten-1">
        <h3 className="whiteText"> Scenario </h3>
        <div>
          {this.props
            .fetchScenario()
            .map((object, i) => (
              <ScenarioStep
                key={i}
                index={i}
                update={this.update}
                remove={this.remove}
                fetchData={this.props.fetchData}
                actor={this.props.fetchScenario()[i].actor}
                addUseCase={this.props.addUseCase}
              >
                {object}
              </ScenarioStep>
            ))}
        </div>
        <button onClick={this.add} className="waves-effect waves-light btn-flat">
          Add new
        </button>
      </div>;
  }
}
