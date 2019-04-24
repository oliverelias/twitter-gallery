// From Tane Morgan (https://github.com/tanem/react-nprogress)

import { withNProgress } from "@tanem/react-nprogress";
import React from "react";
import Bar from "./Bar";
import Container from "./Container";

const Progress = ({ isFinished, progress, animationDuration }) => (
  <Container isFinished={isFinished} animationDuration={animationDuration}>
    <Bar progress={progress} animationDuration={animationDuration} />
  </Container>
);

export default withNProgress(Progress);
