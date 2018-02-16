import React from "react";
import Editable from "./Editable";
import App from "../App";
import { actors, useCases } from "../StringAssets";
export function renderActor(context) {
  return (
    <div className="EditingArea card-panel col s6">
      <h2> Editing Area </h2>
      <div className="no_pad_margin row">
        <h3 className="no_pad_margin col s3 right-align">Actor :</h3>
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
        <label>
          Type
          <select
            className="browser-default"
            value={context.state.object.direct || "direct"}
            id="direct"
            ref="direct"
            onChange={context.save}
          >
            <option value="direct">Direct</option>
            <option value="indirect">Indirect</option>
          </select>
        </label>
        <div className="row">
          <label>
            Description
            <textarea
              className="col s12"
              name="textarea"
              id="description"
              ref="description"
              value={context.state.object.description || ""}
              onChange={context.save}
            />
          </label>
        </div>
      </form>
    </div>
  );
}
