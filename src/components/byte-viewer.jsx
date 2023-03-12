import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
function ByteViewer(props) {
  let context = useContext(AppContext);
  const getIndices = () => {
    if (context.hoverIndex == -1) return [0, 0];
    let row = parseInt(context.hoverIndex.split("_")[0]);
    let col = parseInt(context.hoverIndex.split("_")[1]);
    return [row, col];
  };
  const getAddr = (returnHex) => {
    if (context.hoverIndex == -1) return "$00000000";
    let [row, col] = getIndices();
    return returnHex ? context.int2Hex(context.bank + row * 16 + col, 8, true) : context.bank + row * 16 + col;
  };
  const getBit = (bit) => {
    let addr = getAddr(false);
    if (context.hoverIndex == -1) return 0;
    let byte = context.byteArray[addr] ?? 0;
    return (byte >> bit) & 1;
  };

  return (
    <>
      <div className="col-12">
        <div className="input-group">
          <span className="input-group-text fw-bold bit-display-val">{getAddr(true)}</span>
          {[7, 6, 5, 4, 3, 2, 1, 0].map((bit) => (
            <input key={`bit_${bit}`} type="text" className="form-control bg-light bit-display" disabled value={getBit(bit)} onChange={(e) => {}} />
          ))}
          <span className="input-group-text bit-display-val">{context.getByte(getIndices()[0], getIndices()[1], "DEC")}</span>
          <span className="input-group-text bit-display-val">{`0x${context.getByte(getIndices()[0], getIndices()[1], "HEX")}`}</span>
        </div>
      </div>
    </>
  );
}

export default ByteViewer;
