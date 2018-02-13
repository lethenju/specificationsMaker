import React from "react";

export default class UseCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
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
    this.props.removeUC(this.props.index);
  }
  renderNormal() {
    return (
      <div className="UseCaseNormal card-panel teal lighten-3">
        <h3>{this.props.children}</h3>
        <button onClick={this.edit} className="button-primary">
          Edit
        </button>
        <button onClick={this.remove} className="button-danger">
          Remove
        </button>
      </div>
    );
  }
  renderForm() {
    return (
      <div className="UseCaseForm card-panel teal lighten-3">
        <textarea ref="newText" defaultValue={this.props.children} />
        <button onClick={this.save} className="button-primary">
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
