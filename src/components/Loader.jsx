import React from "react";
import "../css/Loader.css";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="loader">
      <div className="loader__dots">
        <div className="loader__dot" />
        <div className="loader__dot" />
        <div className="loader__dot" />
      </div>
      {text && <p className="loader__text">{text}</p>}
    </div>
  );
};

export default Loader;
