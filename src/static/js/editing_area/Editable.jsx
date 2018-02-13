import React from "react";

export default class Editable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  edit() {
    this.setState({ editing: true });
  }
  save() {
    const value = this.refs.newText.value;
    this.setState({ editing: false });
    this.props.rename(value);
  }


  setWrapperRef(node) {
    this.wrapperRef = node;
  }


  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.save();
    }
  }

  renderNormal() {
    return <h3 onClick={this.edit}>{this.props.children}</h3>;
  }
  renderForm() {
    return <div class="input-field col s9" ref={this.setWrapperRef}>
        <input defaultValue={this.props.children} 
        id="editable" ref="newText" type="text" 
        class="validate" onKeyPress={this._handleKeyPress} />
      </div>;
  }  
  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.save();
    }
  }

  render() {
    if (this.state.editing) {
      return this.renderForm();
    } else {
      return this.renderNormal();
    }
  }
}
