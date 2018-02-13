import React from "react";

export default class Actor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.focus = this.focus.bind(this);
    this.remove = this.remove.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderNormal = this.renderNormal.bind(this);
}

  edit() {
    this.setState({ editing: true });
  }
  save() {
    const value = this.refs.newText.value;
    this.setState({ editing: false });
    this.props.renameAC(value, this.props.index);
  }

  remove() {
    this.props.removeAC(this.props.index);
  }
  focus() {
    const info = {
        type: "actor",
        index: this.props.index,
        name: null
    };
    this.props.showOnEditingArea(info);
  }
  renderNormal() {
    return <div className="ActorNormal card-panel blue lighten-3" onClick={this.focus}>
        <h3>{this.props.children}</h3>
        <button onClick={this.edit} className="waves-effect waves-light btn">
          Edit
        </button>
        <button onClick={this.remove} className="waves-effect waves-light btn">
          Remove
        </button>
      </div>;
  }
  renderForm() {
    return <div className="ActorForm card-panel blue lighten-3">
        <textarea ref="newText" defaultValue={this.props.children} />
        <button onClick={this.save} className="waves-effect waves-light btn">
          Save
        </button>
      </div>;
  }
  render() {
    if (this.state.editing) {
      return this.renderForm();
    } else {
      return this.renderNormal();
    }
  }
}
