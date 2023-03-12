import React from "react";

import logo from "./logo.svg";
import "./styles/main.css";
import { useState } from "react";
import MemoryWindow from "./components/memory-window";
import "bootstrap/dist/css/bootstrap.min.css";
import AddressSelect from "./components/address-select";
import IntHexConvert from "./components/int-hex-convert";
import FileHandler from "./components/file-handler";
import ByteViewer from "./components/byte-viewer";
export const AppContext = React.createContext("default");

function App() {
  const [byteArray, setByteArray] = useState([]);
  const [bank, setBank] = useState(0);
  const [byteBank, setByteBank] = useState([]);
  const [showAsHex, setShowAsHex] = useState(true);
  const [hoverIndex, setHoverIndex] = useState(-1);

  const updateBank = (bank) => {
    let newBank = bank > 0xfffffff0 ? 0xfffffff0 : bank;
    setBank(newBank);
    setByteBank(byteArray.slice(bank, bank + 256));
  };

  const int2Hex = (n, pad, include_dollar = false) => {
    let s = "";
    for (let i = 0; i < pad; i++) {
      s += "0";
    }
    s += parseInt(n).toString(16);

    let hex = s.substring(s.length - pad).toUpperCase();
    return include_dollar ? `\$${hex}` : hex;
  };

  const hex2Int = (hex) => {
    return parseInt(hex, 16);
  };

  const getByte = (i, j, type) => {
    let addr = i * 16 + j;
    if (byteBank[addr] == undefined) return "--";
    if (type) {
      return type == "HEX" ? int2Hex(byteBank[addr], 2) : byteBank[addr];
    } else {
      return showAsHex ? int2Hex(byteBank[addr], 2) : byteBank[addr];
    }
  };

  return (
    <AppContext.Provider
      value={{ byteArray, setByteArray, byteBank, setByteBank, int2Hex, hex2Int, bank, updateBank, hoverIndex, setHoverIndex, getByte }}
    >
      <div className="App ">
        <div className="container">
          <div className="row mt-4">
            <div className="col-12">
              <FileHandler />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  checked={showAsHex}
                  onChange={(e) => setShowAsHex(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                  Show data as hexadecimal
                </label>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <IntHexConvert />
          </div>
          <div className="row mt-4">
            <AddressSelect />
          </div>
          <div className="row mt-4">
            <ByteViewer />
          </div>
          <div className="row mt-4">
            <MemoryWindow showAsHex={showAsHex} />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
