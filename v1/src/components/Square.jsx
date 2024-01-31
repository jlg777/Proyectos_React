import React from "react";
import "../App.css";

const Square = ({ children, index, isSelected, updateBoard }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleclick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleclick} className={className}>
      {children}
    </div>
  );
};

export default Square;
