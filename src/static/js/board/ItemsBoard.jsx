import React from "react";
import Paragraph from "./Paragraph";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { paragraphs: [] };
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.focus = this.focus.bind(this);
    this.add = this.add.bind(this);
    this.each = this.each.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  add() {
    let newPar = this.state.paragraphs;
    if (this.props.type === "Actors") {
      newPar.push({ name: "New Actor", direct: "false", description: null });
    } else {
      newPar.push({
        name: "New UC",
        description: null
      });
    }
    this.setState({ paragraphs: newPar });
  }

  remove(i) {
    let newPar = this.state.paragraphs;
    newPar.splice(i, 1);
    this.setState({ paragraphs: newPar });
  }

  update(i, field, newText) {
    let newPar = this.state.paragraphs;
    newPar[i][field] = newText;
    this.setState({ paragraphs: newPar });
  }

  focus(info) {
    const addedInfo = {
      command: info.command,
      type: this.props.type,
      index: info.index,
      object: this.state.paragraphs[info.index]
    }
    this.props.showOnEditingArea(addedInfo);
  }

  each(object, i) {
    return (
      <Paragraph
        key={i}
        index={i}
        type={this.props.type}
        update={this.update}
        remove={this.remove}
        showOnEditingArea={this.focus}
      >
        {object.name}
      </Paragraph>
    );
  }

  render() {
    return (
      <div
        className={"ActorsBoard card-panel " + this.props.color + " lighten-4"}
      >
        <h2> {this.props.type} </h2>
        <div>{this.state.paragraphs.map(this.each)}</div>
        <button onClick={this.add} className="waves-effect waves-light btn">
          Add new
        </button>
      </div>
    );
  }
}
