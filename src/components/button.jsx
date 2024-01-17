import React from 'react';

const TextButton = ({ onClick, label,color,style }) => {
  return (
    <button
      className={`border bg-black font-sans text-white rounded-md sm:w-auto md:w-40 sm:text-sm md:text-md text-xs ${style}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TextButton;
