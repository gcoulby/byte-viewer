import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
function FileHandler(props) {
  let context = useContext(AppContext);
  const [file, setFile] = useState(null);

  const fileInputChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const bytes = new Uint8Array(reader.result);
      context.setByteArray(bytes);
      context.setByteBank(bytes.slice(0, 256));
    };
  };
  return (
    <>
      <input type="file" id="file" className="" onChange={(e) => fileInputChange(e)} />
      <table className="table">
        <thead>
          <tr>
            <th width="150"></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="fw-bold">File Name:</td>
            <td>{file ? file.name : ""}</td>
          </tr>
          <tr>
            <td className="fw-bold">File Type:</td>
            <td>{file ? file.type : ""}</td>
          </tr>
          <tr>
            <td className="fw-bold">File Size:</td>
            <td>{file ? `${file.size}b` : ""}</td>
          </tr>
          <tr>
            <td className="fw-bold">Address Range:</td>
            <td>{file ? `0x0000 - 0x${context.byteArray.length.toString(16).toUpperCase()}` : ""}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default FileHandler;
