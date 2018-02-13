import React from "react";
import Paragraph from "./Paragraph";

export default class  extends React.Component {
  constructor(props) {
    super(props);
    this.state = { paragraphs: [] };
    this.remove = this.remove.bind(this);
    this.rename = this.rename.bind(this);
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
    newPar.push("new item");
    this.setState({ paragraphs: newPar });
  }

  remove(i) {
    let newPar = this.state.paragraphs;
    newPar.splice(i, 1);
    this.setState({ paragraphs: newPar });
  }

  rename(i, newText) {
    let newPar = this.state.paragraphs;
    newPar[i] = newText;
    this.setState({ paragraphs: newPar });    
  }
  focus(info) {
    if (info.command != "clear") {
      info.name = this.state.paragraphs[info.index];
    }
    this.props.showOnEditingArea(info);
  }

  each(text, i) {
    return (
      <Paragraph
        key={i}
        index={i}
        type={this.props.type}
        rename={this.rename}
        remove={this.remove}
        showOnEditingArea={this.focus}
      >
        {text}
      </Paragraph>
    );
  }

  renderActor() {
    return <div className="ActorsBoard card-panel blue lighten-4">
        <h2> {this.props.type} </h2>
        <div>{this.state.paragraphs.map(this.each)}</div>
        <button onClick={this.add} className="waves-effect waves-light btn">
          Add new
        </button>
      </div>;
  }
  renderUC() {
   return <div className="UCBoard card-panel teal lighten-4">
       <h2> {this.props.type} </h2>
       <div>{this.state.paragraphs.map(this.each)}</div>
       <button onClick={this.add} className="waves-effect waves-light btn">
         Add new
       </button>
     </div>;
  }
  render(){
    if (this.props.type == "Actors"){
      return this.renderActor();
    } else {
      return this.renderUC();
    }
  }
}
