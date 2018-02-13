import React from "react";

export default class UseCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
    this.focus = this.focus.bind(this);

    this.renderNormal = this.renderNormal.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }
  edit() {
    this.setState({ editing: true });
  }
  save() {
    const value = this.refs.newText.value;
    this.setState({ editing: false });
    this.props.renameUC(value, this.props.index);
  }

  remove() {
    if (window.confirm("Are you sure?")) {
      this.props.removeUC(this.props.index);
    }
  }
  focus() {
    const info = { type: "UC", index: this.props.index, name: null };
    this.props.showOnEditingArea(info);
  }
  renderNormal() {
    return (
      <div
        className="UseCaseNormal card-panel teal lighten-3"
        onClick={this.focus}
      >
        <h3>{this.props.children}</h3>
        <button onClick={this.edit} className="waves-effect waves-light btn">
          Edit
        </button>
        <button onClick={this.remove} className="waves-effect waves-light btn">
          Remove
        </button>
      </div>
    );
  }
  renderForm() {
    return (
      <div className="UseCaseForm card-panel teal lighten-3">
        <textarea ref="newText" defaultValue={this.props.children} />
        <button onClick={this.save} className="waves-effect waves-light btn">
          Save
        </button>
      </div>
    );
  }
  render() {
    if (this.state.editing) {
      return this.renderForm();
    } else {
      return this.renderNormal();
    }
  }
}
