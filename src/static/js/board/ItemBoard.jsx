import React from "react";
import Editable from "../editing_area/Editable"

export default class ItemBoard extends React.Component{
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
    this.state = { [this.props.type]: null };
    this.update = this.update.bind(this);
    this.focus = this.focus.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  update(i, field, newText) {\/*
    let newPar = this.state.paragraphs;
    newPar[i][field] = newText;
    this.props.storeData(this.props.type, newPar);
    this.setState({ paragraphs: newPar }); */
  }

  focus(info) {
    const addedInfo = {
      command: info.command,
      type: this.props.type,
      index: info.index,
      object: this.state[this.props.type][info.index]
    };
    this.props.showOnEditingArea(addedInfo);
  }

  render() {
    return (
      <div
        className={"ActorsBoard card-panel " + this.props.color + " lighten-4"}
      >
        <h2>
          {this.props.type}
        </h2>
        <div>
          {
            <Editable/>
          }
        </div>
      </div>
    );
  }
}