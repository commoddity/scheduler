import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    (!replace) ? history.push(newMode) : history.splice(-1, 1, newMode);
    setMode(newMode);
  };

  const back = () => {
    history > initial && history.pop();
    setMode(history.slice(-1)[0]);
  }

  return { mode, transition, back }

}

