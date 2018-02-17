import React from "react";

export default class ScenarioStep extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }
  save() {
    this.props.update(this.props.index, "actor", this.refs.actor.value);
    this.props.update(this.props.index, "action", this.refs.action.value);
  }

  remove() {
    if (window.confirm("Are you sure?")) {
      this.props.remove(this.props.index);
    }
  }
  render() {
    return (
      <div className={"ScenarioStep card-panel red lighten-3"}>
        <div className="ScenarioStep row">
          <h4 className="col s2"> {this.props.children.key}</h4>
          <input
            className="col s5"
            defaultValue={this.props.children.actor}
            id="Actor"
            ref="newText"
            type="text"
            onChange={this.save}
          />
          <input
            className="col s5"
            defaultValue={this.props.children.action}
            id="Actor"
            ref="newText"
            type="text"
            onChange={this.save}
          />
        </div>
        <button
          onClick={this.remove}
          className="waves-effect waves-light btn-flat"
        >
          Remove
        </button>
      </div>
    );
  }
}
