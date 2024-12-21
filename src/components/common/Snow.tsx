import React from 'react';
import '../../assets/css/Snow.css';

const Snow = () => {
  return (
    <>
      <div className="christmas-tree-background"/>
      <div className="snow-container">
        {[...Array(50)].map((_, index) => (
          <div key={index} className="snowflake"/>
        ))}
      </div>
    </>
  );
};

export default Snow;
