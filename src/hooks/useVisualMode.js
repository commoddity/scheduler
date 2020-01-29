import React, { useState } from 'react';

// Hook handles transitions between Appoiment component modes
export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	// Transitions modes OR replaces mode if 'replace = true'
	const transition = (newMode, replace = false) => {
		!replace ? history.push(newMode) : history.splice(-1, 1, newMode);
		setMode(newMode);
	};

	const back = () => {
		history > initial && history.pop();
		setMode(history.slice(-1)[0]);
	};

	return { mode, transition, back };
}
