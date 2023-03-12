import React, { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../App";
function IntHexConvert(props) {
  let context = useContext(AppContext);
  const decRef = useRef();
  const hexRef = useRef();

  const [hex, setHex] = useState(0);
  const [dec, setDec] = useState("0");

  const updateDexAndHex = (e) => {
    if (e.target.value == "") return;
    switch (e.target.id) {
      case "dec":
        if (e.target.value != dec) {
          setDec(e.target.value);
        }
        let hexConv = context.int2Hex(e.target.value);
        if (hexConv != hex) {
          setHex(context.int2Hex(e.target.value));
        }
        break;
      case "hex":
        if (e.target.value != hex) {
          setHex(e.target.value);
        }
        let decConv = context.hex2Int(e.target.value);
        if (decConv != dec) {
          setDec(context.hex2Int(e.target.value));
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="col-6">
        <div className="input-group">
          <span className="input-group-text">DEC</span>
          <input type="number" className="form-control" id="dec" value={dec} onChange={(e) => updateDexAndHex(e)} />
        </div>
      </div>
      <div className="col-6">
        <div className="input-group">
          <span className="input-group-text">HEX</span>
          <input type="text" className="form-control" id="hex" value={hex} onChange={(e) => updateDexAndHex(e)} onFocus={(e) => e.target.select()} />
        </div>
      </div>
    </>
  );
}

export default IntHexConvert;
