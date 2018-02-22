import React from "react";
import Paragraph from "./Paragraph";
import {
  actors,
  useCases,
  actorsDisplay,
  useCasesDisplay
} from "../StringAssets";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { paragraphs: [] };
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.focus = this.focus.bind(this);
    this.add = this.add.bind(this);
    if (this.props.isAlone) {
      this.addNamed(this.props.type);
    }
  }
  componentDidMount() {
    if (!this.props.isAlone) {
      this.props.onRef(this);
    }
  }
  componentWillUnmount() {
    if (!this.props.isAlone) {
      this.props.onRef(undefined);
    }
  }
  addNamed(name) {
    let newPar = this.state.paragraphs;
    if (this.props.type === actors()) {
      newPar.push({ name: name, direct: "false", description: null });
    } else if (this.props.type === useCases()) {
      newPar.push({
        name: name,
        description: null,
        preconditions: null,
        mainActors: [],
        secondActors: [],
        minimalgaranties: null,
        successgaranties: null,
        scenario: []
      });
    } else if (name === "Introduction") {
      newPar.push({
        name: name
        // TODO Add other parts proper to introduction
      });
    } else if (name === "Conclusion") {
      newPar.push({ name: name });
      // TODO Add other parts proper to introduction
    }
    this.props.storeData(this.props.type, newPar);
    this.setState({ paragraphs: newPar });
  }
  add() {
    let newPar = this.state.paragraphs;
    if (this.props.type === actors()) {
      newPar.push({
        name: "New Actor",
        direct: "false",
        description: null
      });
    } else if (this.props.type === useCases()) {
      newPar.push({
        name: "New UC",
        description: null,
        preconditions: null,
        mainActors: [],
        secondActors: [],
        minimalgaranties: null,
        successgaranties: null,
        scenario: []
      });
    }
    this.props.storeData(this.props.type, newPar);
    this.setState({ paragraphs: newPar });
  }

  remove(i) {
    let newPar = this.state.paragraphs;
    newPar.splice(i, 1);
    this.props.storeData(this.props.type, newPar);
    this.setState({ paragraphs: newPar });
  }

  update(i, field, newText) {
    let newPar = this.state.paragraphs;
    newPar[i][field] = newText;
    this.props.storeData(this.props.type, newPar);
    this.setState({ paragraphs: newPar });
  }

  focus(info) {
    const addedInfo = {
      command: info.command,
      type: this.props.type,
      index: info.index,
      object: this.state.paragraphs[info.index]
    };
    this.props.showOnEditingArea(addedInfo);
  }

  render() {
    if (this.props.isAlone) {
      return (
        <div
          className={
            "ActorsBoard card-panel " + this.props.color + " lighten-4"
          }
        >
          <div>
            <Paragraph
              key={0}
              index={0}
              type={this.props.type}
              update={this.update}
              color={this.props.color}
              showOnEditingArea={this.focus}
              editing={false}
            >
              {this.state.paragraphs[0].name}
            </Paragraph>
          </div>
        </div>
      );
    } else
      return (
        <div
          className={
            "ActorsBoard card-panel " + this.props.color + " lighten-4"
          }
        >
          <h2>
            {" "}
            {this.props.type === actors()
              ? actorsDisplay()
              : useCasesDisplay()}{" "}
          </h2>
          <div>
            {this.state.paragraphs.map((object, i) => (
              <Paragraph
                key={i}
                index={i}
                type={this.props.type}
                update={this.update}
                remove={this.remove}
                color={this.props.color}
                showOnEditingArea={this.focus}
                editing={true}
              >
                {object.name}
              </Paragraph>
            ))}
          </div>
          <button onClick={this.add} className="waves-effect waves-light btn">
            Add new
          </button>
        </div>
      );
  }
}
