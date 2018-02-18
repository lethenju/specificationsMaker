import React from "react";
import Editable from "../Editable";
import Scenario from "./Scenario";
import App from "../../App";
import { actors, useCases } from "../../StringAssets";
export function renderUC(context) {
  return (
    <div className="EditingArea  col s8">
      <h2> Editing Area </h2>
      <div className="row" className="no_pad_margin">
        <h3 className="no_pad_margin col s3 right-align">Use case :</h3>
        <Editable
          className="no_pad_margin col s8"
          type="editable"
          rename={context.renameElement}
        >
          {context.state.object.name}
        </Editable>
      </div>
      <div className="divider" />
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
        <label className="col s6">
          Main Actors
          <select
            multiple
            id="mainActors"
            className="browser-default"
            value={
              context.state.object.mainActors.length != 0
                ? context.state.object.mainActors
                : []
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
        <label className="col s6">
          Secondary Actors
          <select
            multiple
            className="browser-default"
            id="secondActors"
            value={
              context.state.object.secondActors.length != 0
                ? context.state.object.secondActors
                : []
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
        <label className="col s6">
          Minimal garanties
          <textarea
            name="textarea"
            id="minimalgaranties"
            ref="minimalgaranties"
            value={context.state.object.minimalgaranties || ""}
            onChange={context.save}
          />
        </label>
        <label className="col s6">
          Success garanties
          <textarea
            name="textarea"
            id="successgaranties"
            ref="successgaranties"
            value={context.state.object.successgaranties || ""}
            onChange={context.save}
          />
        </label>
      </div>
      <Scenario
        fetchData={context.props.fetchData}
        fetchScenario={context.fetchScenario}
        storeScenario={context.storeScenario}
        addUseCase={context.props.addUseCase}
      />
    </div>
  );
}
