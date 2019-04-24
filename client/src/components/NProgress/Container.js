// From Tane Morgan (https://github.com/tanem/react-nprogress)

import React from "react";

const Container = ({ children, isFinished, animationDuration }) => (
  <div
    style={{
      opacity: isFinished ? 0 : 1,
      pointerEvents: "none",
      transition: `opacity ${animationDuration}ms linear`,
    }}
  >
    {children}
  </div>
);

export default Container;
