import React, { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../App";
function MemoryWindow(props) {
  let context = useContext(AppContext);

  const getChar = (i, j) => {
    let byte = context.getByte(i, j, "DEC");
    let char = String.fromCharCode(byte);
    if (byte == "--") {
      char = "·";
    } else {
      char = String.fromCodePoint(byte);
    }
    return char;
  };

  return (
    <>
      <div id="memory-window" className="col-8">
        <table className="table monitor-table ">
          <thead>
            <tr className="bg-light">
              <th scope="col" style={{ width: "10%" }}>
                ADDR
              </th>
              <th scope="col">0</th>
              <th scope="col">1</th>
              <th scope="col">2</th>
              <th scope="col">3</th>
              <th scope="col">4</th>
              <th scope="col">5</th>
              <th scope="col">6</th>
              <th scope="col">7</th>
              <th scope="col">8</th>
              <th scope="col">9</th>
              <th scope="col">A</th>
              <th scope="col">B</th>
              <th scope="col">C</th>
              <th scope="col">D</th>
              <th scope="col">E</th>
              <th scope="col">F</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(16)].map((_, i) => {
              return (
                <tr key={`data_row:${i}`}>
                  <th scope="row" className="bg-light">
                    {context.int2Hex(context.bank + i, 8, true)}
                  </th>
                  {[...Array(16)].map((_, j) => {
                    return (
                      <td
                        key={`data_${i}_${j}`}
                        className={context.hoverIndex == `${i}_${j}` ? "hovered" : ""}
                        onMouseEnter={() => {
                          context.setHoverIndex(`${i}_${j}`);
                        }}
                        onMouseLeave={() => {
                          context.setHoverIndex(-1);
                        }}
                      >
                        {context.getByte(i, j)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div id="ascii-window" className="col-4">
        <table className="table monitor-table">
          <thead>
            <tr>
              {[...Array(16)].map((_, i) => (
                <th key={`ascii_head:${i}`} scope="col" style={{ width: "6%" }}>
                  &nbsp;
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(16)].map((_, i) => {
              return (
                <tr key={`ascii_row:${i}`}>
                  {[...Array(16)].map((_, j) => {
                    return (
                      <td
                        key={`ascii_${i}_${j}`}
                        className={context.hoverIndex == `${i}_${j}` ? "hovered" : ""}
                        onMouseEnter={() => {
                          context.setHoverIndex(`${i}_${j}`);
                        }}
                        onMouseLeave={() => {
                          context.setHoverIndex(-1);
                        }}
                      >
                        {getChar(i, j)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MemoryWindow;
