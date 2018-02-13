import React from "react";
import Editable from "./Editable";

export default class EditingArea extends React.Component {
                 constructor(props) {
                   super(props);
                   this.state = { render: false };
                   this.renameElement = this.renameElement.bind(this);
                 }
                 componentDidMount() {
                   this.props.onRef(this);
                 }
                 componentWillUnmount() {
                   this.props.onRef(undefined);
                 }
                 update(info) {
                   if (info.command == "show") {
                     this.setState({
                       render: true,
                       type: info.type,
                       index: info.index,
                       object: {
                         name: info.name
                       }
                     });
                   } else {
                     this.setState({ render: false });
                   }
                 }

                 renameElement(newText) {
                   this.setState({
                     render: this.state.render,
                     type: this.state.type,
                     index: this.state.index,
                     object: {
                       name: newText
                     }
                   });
                 }

                 renderActor() {
                   return <div className="EditingArea card-panel col s6">
                       <h2> Editing Area </h2>
                       <div className="row">
                       <h3 className="col s4"> Actor :</h3>
                       <Editable className="col s8"  key={1} index={1} type="editable" rename={this.renameElement}>
                         {this.state.object.name}
                       </Editable>
                       </div>
                     </div>;
                 }
                 renderUC() {
                   return <div className="EditingArea card-panel col s8">
                       <h2> Editing Area </h2>
                       <h3>
                         {" "}
                         Use Case : {
                           this.state.object.name
                         }{" "}
                       </h3>
                     </div>;
                 }
                 render() {
                   if (this.state.render) {
                     if (this.state.type == "actor") {
                       return this.renderActor();
                     } else if (this.state.type == "UC") {
                       return this.renderUC();
                     }
                   } else {
                     return <div className="EditingArea card-panel col s8">
                         <h2> Editing Area </h2>
                       </div>;
                   }
                 }
               }
