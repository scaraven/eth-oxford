import React, { useState, useEffect, useMemo } from "react";
import { GRID_SIZES, GridDimension } from "../types";

type Props = {
  dimension: number;
  message: string;
  setMessage: (message: string) => void;
  setDimension: (dimension: GridDimension) => void;
};

const GridDiagram: React.FC<Props> = ({
  message,
  setMessage,
  dimension,
  setDimension,
}) => {
  const paddedValues = useMemo(() => {
    const padding = dimension * dimension - message.length;
    const values = message.split("").map((char) => char.charCodeAt(0));
    return [...values, ...Array.from({ length: padding }, () => "_")];
  }, [dimension, message]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value) as GridDimension;
    setDimension(newSize);
    setMessage("");
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMessage = event.target.value.slice(0, dimension * dimension);
    setMessage(newMessage);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <select
        value={dimension}
        onChange={handleSizeChange}
        className="border p-2 rounded"
      >
        {GRID_SIZES.map((size) => (
          <option key={size} value={size}>{`${size} x ${size}`}</option>
        ))}
      </select>

      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        className="border p-2 rounded w-48"
        placeholder="Enter message..."
      />

      <div
        className="grid p-1"
        style={{ gridTemplateColumns: `repeat(${dimension}, 46px)` }}
      >
        {paddedValues.map((value, index) => (
          <div
            key={index}
            className="border p-1 w-10 text-center my-1 bg-gray-100"
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridDiagram;
