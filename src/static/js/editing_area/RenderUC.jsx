import React from "react";
import Editable from "./Editable";
import App from "../App";
import { actors, useCases } from "../StringAssets";
export function renderUC(context) {
  return (
    <div className="EditingArea  col s8">
      <h2> Editing Area </h2>
      <div className="row" className="no_pad_margin">
        <h3 className="no_pad_margin col s3 right-align">Use case :</h3>
        <Editable
          className="no_pad_margin col s8"
          key={1}
          index={1}
          type="editable"
          rename={context.renameElement}
        >
          {context.state.object.name}
        </Editable>
      </div>
      <div className="divider" />
      <form>
        <div className="row">
          <label>
            Description
            <textarea
              className="col s12"
              name="textarea"
              ref="description"
              id="description"
              value={context.state.object.description || ""}
              onChange={context.save}
            />
          </label>
        </div>

        <div className="row">
          <label>
            Main Actors
            <select
              multiple
              id="mainActors"
              className="browser-default"
              value={
                context.state.object.mainActors.length != 0
                  ? context.state.object.mainActors
                  : context.props.fetchData().actors.data.length != 0
                    ? []
                    : ["Create an actor first"]
              }
              onChange={context.save}
            >
              {context.props
                .fetchData()
                .actors.data.map((object, i) => (
                  <option key={i}>{object.name}</option>
                ))}
            </select>
          </label>
        </div>
        <div className="row">
          <label>
            Secondary Actors
            <select
              multiple
              className="browser-default"
              id="secondActors"
              value={
                context.state.object.secondActors.length != 0
                  ? context.state.object.secondActors
                  : context.props.fetchData().actors.data.length != 0
                    ? []
                    : ["Create an actor first"]
              }
              onChange={context.save}
            >
              {context.props
                .fetchData()
                .actors.data.map((object, i) => (
                  <option key={i}>{object.name}</option>
                ))}
            </select>
          </label>
        </div>
        <div className="row">
          <label>
            Preconditions
            <textarea
              className="col s12"
              name="textarea"
              id="preconditions"
              ref="preconditions"
              value={context.state.object.preconditions || ""}
              onChange={context.save}
            />
          </label>
        </div>
        <div className="row">
          <label>
            Minimal garanties
            <textarea
              className="col s12"
              name="textarea"
              id="minimalgaranties"
              ref="minimalgaranties"
              value={context.state.object.minimalgaranties || ""}
              onChange={context.save}
            />
          </label>
        </div>
        <div className="row">
          <label>
            Success garanties
            <textarea
              className="col s12"
              name="textarea"
              id="successgaranties"
              ref="successgaranties"
              value={context.state.object.successgaranties || ""}
              onChange={context.save}
            />
          </label>
        </div>
      </form>
    </div>
  );
}
