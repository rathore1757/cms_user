import React from "react";
import "./Loader.scss";
const Loader = ({ size }) => {
  return <div style={{ width: size, height: size }} className="loader"></div>;
};
export const Loader1 = ({ size }) => {
  return <div style={{ width: size, height: size }} className="loader1"></div>;
};
export const Loader2 = ({ size }) => {
  return <div style={{ width: size, height: size }} className="loader2"></div>;
};

export default Loader;
