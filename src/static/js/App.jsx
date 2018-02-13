 import React from "react";
 import Board from "./board/Board"
 import EditingArea from "./editing_area/EditingArea"

 export default class App extends React.Component {
     constructor(props){
        super(props);
        this.showOnEditingArea = this.showOnEditingArea.bind(this);
     }

     showOnEditingArea(info){
         this.editingArea.update(info);
     }
     render() {
         return <div className="App row">
             <div className="col s4">
               <Board showOnEditingArea={this.showOnEditingArea} />{" "}
             </div>
             <div className="col s8">
               <EditingArea onRef={ref => (this.editingArea = ref)} />
             </div>
           </div>;
     }
    }