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
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  add() {
    let newPar = this.state.paragraphs;
    if (this.props.type === "actors") {
      newPar.push({ name: "New Actor", direct: "false", description: null });
      
    } else {
      newPar.push({
        name: "New UC",
        description: null,
        preconditions: null,
        mainActors: [],
        secondActors: [],
        minimalgaranties: null,
        successgaranties: null
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
    }
    this.props.showOnEditingArea(addedInfo);
  }


  render() {
    return <div className={"ActorsBoard card-panel " + this.props.color + " lighten-4"}>
        <h2> {this.props.type} </h2>
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
            >
              {object.name}
            </Paragraph>
          ))}
        </div>
        <button onClick={this.add} className="waves-effect waves-light btn">
          Add new
        </button>
      </div>;
  }
}
