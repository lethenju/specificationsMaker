import React from "react";

export default class Paragraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: true };
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.focus = this.focus.bind(this);
    this.remove = this.remove.bind(this);
  }

  edit() {
    const newState = this.state;
    newState.editing = true;
    this.setState(newState);
  }
  save() {
    const newState = this.state;
    newState.editing = false;
    this.setState(newState);
    this.props.update(this.props.index, "name", this.refs.newText.value);
    const info = {
      command: "show",
      index: this.props.index,
    };
    this.props.showOnEditingArea(info);
  }

  remove() {
    if (window.confirm("Are you sure?")) {
      this.props.remove(this.props.index);
      // clearing info on editing pane
      const info = { command: "delete" };
      this.props.showOnEditingArea(info);
    }
  }
  focus() {
    const info = {
      command: "show",
      type: this.props.type,
      index: this.props.index,
      name: null,
    };
    this.props.showOnEditingArea(info);
  }
  renderActorNormal() {
    return (
      <div
        className="ActorNormal card-panel blue lighten-3"
        onClick={this.focus}
      >
        <h3>{this.props.children}</h3>
        <button
          onClick={this.edit}
          className="waves-effect waves-light btn-flat"
        >
          Edit
        </button>
        <button
          onClick={this.remove}
          className="waves-effect waves-light btn-flat"
        >
          Remove
        </button>
      </div>
    );
  }
  renderActorForm() {
    return (
      <div className="ActorForm card-panel blue lighten-3">
        <div class="input-field col s6">
          <input
            defaultValue={this.props.children}
            id="Actor"
            ref="newText"
            type="text"
            class="validate"
          />
        </div>
        <button onClick={this.save} className="waves-effect waves-light btn">
          Save
        </button>
      </div>
    );
  }
  renderUCNormal() {
    return (
      <div className="UCNormal card-panel teal lighten-3" onClick={this.focus}>
        <h3>{this.props.children}</h3>
        <button
          onClick={this.edit}
          className="waves-effect waves-light btn-flat"
        >
          Edit
        </button>
        <button
          onClick={this.remove}
          className="waves-effect waves-light btn-flat"
        >
          Remove
        </button>
      </div>
    );
  }
  renderUCForm() {
    return (
      <div className="UCForm card-panel teal lighten-3">
        <div class="input-field col s6">
          <input
            defaultValue={this.props.children}
            id="UC"
            ref="newText"
            type="text"
            class="validate"
          />
        </div>
        <button onClick={this.save} className="waves-effect waves-light btn">
          Save
        </button>
      </div>
    );
  }
  render() {
    if (this.state.editing) {
      if (this.props.type == "Actors") {
        return this.renderActorForm();
      } else {
        return this.renderUCForm();
      }
    } else {
      if (this.props.type == "Actors") {
        return this.renderActorNormal();
      } else {
        return this.renderUCNormal();
      }
    }
  }
}
