// From Tane Morgan (https://github.com/tanem/react-nprogress)

import React from "react";

const Bar = ({ progress, animationDuration }) => (
  <div
    style={{
      background: "#f50057",
      height: 2,
      left: 0,
      marginLeft: `${(-1 + progress) * 100}%`,
      position: "fixed",
      top: 0,
      transition: `margin-left ${animationDuration}ms linear`,
      width: "100%",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        boxShadow: "0 0 10px #29d, 0 0 5px #f50057",
        display: "block",
        height: "100%",
        opacity: 1,
        position: "absolute",
        right: 0,
        transform: "rotate(3deg) translate(0px, -4px)",
        width: 100,
      }}
    />
  </div>
);

export default Bar;
