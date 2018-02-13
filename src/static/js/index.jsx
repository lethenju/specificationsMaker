/** @file index.jsx
 *  @author Julien LE THENO
 *  @desc index of javascript, renders the react app in html 
 */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("content"));