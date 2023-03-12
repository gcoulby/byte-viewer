import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../App";
function AddressSelect(props) {
  const bankRef = useRef();
  let context = useContext(AppContext);
  return (
    <>
      <div className="row mt-4">
        <div className="col-4">
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="text"
              className="form-control"
              id="dec"
              length="8"
              maxLength="8"
              value={context.int2Hex(context.bank)}
              onChange={(e) => {
                if (e.target.value == "") return;
                context.updateBank(context.hex2Int(e.target.value));
              }}
              onFocus={(e) => e.target.select()}
            />
            <div
              className="input-group-text input-group-append"
              onClick={() => {
                context.updateBank(context.hex2Int(bankRef.current.value));
              }}
              style={{ cursor: "pointer" }}
            >
              GOTO
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="input-group">
            <span className="input-group-text">BANK:</span>
            <input
              type="text"
              disabled
              className="form-control bg-light"
              id="hex"
              value={`${context.int2Hex(context.bank, 4, true)} - ${context.int2Hex(context.bank + 255, 4, true)}`}
            />
          </div>
        </div>

        <div className="col-2">
          <div className="d-grid">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => context.updateBank(context.bank - 256 > 0 ? context.bank - 256 : 0)}
              disabled={context.bank == 0}
            >
              ← Previous Bank
            </button>
          </div>
        </div>
        <div className="col-2">
          <div className="d-grid">
            <button type="button" className="btn btn-primary" onClick={() => context.updateBank(context.bank + 256)}>
              <i className="fas fa-arrow-right"></i>Next Bank→
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddressSelect;
