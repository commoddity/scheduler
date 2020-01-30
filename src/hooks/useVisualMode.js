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
		if (history.length <= 1) {
			return;
		}
		const newHistory = [...history];
		newHistory.pop();
		setMode(newHistory[newHistory.length - 1]);
		setHistory(newHistory);
	};

	return { mode, transition, back };
}
