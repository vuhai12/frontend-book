import React from "react";

const Alert = ({ background, width, error, message }) => {
  return (
    <div style={width} background={background}>
      <p style={error ? { color: "red" } : { color: "green" }}>{message}</p>
    </div>
  );
};
export default Alert;
