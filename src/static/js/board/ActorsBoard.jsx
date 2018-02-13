import React from "react";
import Actor from "./Actor";

export default class ActorsBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { actors: ["My first actor"] };
    this.removeActor = this.removeActor.bind(this);
    this.renameActor = this.renameActor.bind(this);
    this.focusActor = this.focusActor.bind(this);
    this.addActor = this.addActor.bind(this);
    this.eachActor = this.eachActor.bind(this);
  }

  addActor() {
    let newActors = this.state.actors;
    newActors.push("new Actor");
    this.setState({ actors: newActors });
  }

  removeActor(i) {
    let newActors = this.state.actors;
    newActors.splice(i, 1);
    this.setState({ actors: newActors });
  }

  renameActor(newText, i) {
    let newActors = this.state.actors;
    newActors[i] = newText;
    this.setState({ actors: newActors });
  }
  focusActor(info) {
    if (info.command != "clear"){
        info.name = this.state.actors[info.index];
    } 
    this.props.showOnEditingArea(info);
  }

  eachActor(text, i) {
    return (
      <Actor
        key={i}
        index={i}
        renameAC={this.renameActor}
        removeAC={this.removeActor}
        showOnEditingArea={this.focusActor}
      >
        {text}
      </Actor>
    );
  }

  render() {
    return (
      <div className="ActorsBoard card-panel blue lighten-4">
        <h2> Actors </h2>
        <div>{this.state.actors.map(this.eachActor)}</div>
        <button onClick={this.addActor} className="waves-effect waves-light btn">Add new</button>
      </div>
    );
  }
}
