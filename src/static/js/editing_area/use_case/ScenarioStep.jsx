import React from "react";

export default class ScenarioStep extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }
  save(event) {
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
      <div className={"ScenarioStep card-panel"}>
        <div className="ScenarioStep row">
          <h4 className="col s2"> {this.props.children.key}</h4>
          <label className="col s5">
            Concerned actor
            <select
              className="browser-default"
              value={this.props.actor || ""}
              id="Actor"
              ref="actor"
              onChange={this.save}
            >
              {this.props
                .fetchData()
                .actors.data.map((object, i) => (
                  <option key={i}>{object.name}</option>
                ))}
            </select>
          </label>
          <label className="col s5">
            Action
            <input
              defaultValue={this.props.children.action}
              id="Action"
              ref="action"
              type="text"
              onChange={this.save}
            />
          </label>
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
