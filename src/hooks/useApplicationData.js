import React, { useReducer, useEffect } from 'react';
import Axios from 'axios';

const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';
const DELETE_INTERVIEW = 'DELETE_INTERVIEW';

const initialValues = {
	day: 'Monday',
	days: [],
	appointments: {},
	interviewers: {}
};

const lookupTable = {
	SET_DAY: (state, action) => ({ ...state, day: action.value }),
	SET_APPLICATION_DATA: (state, action) => ({ ...state, ...action.value }),
	SET_INTERVIEW: (state, action) => ({
		...state,
		appointments: action.value[0],
		days: action.value[1]
	})
};

function reducer(state, action) {
	return lookupTable[action.type]
		? lookupTable[action.type](state, action)
		: lookupTable.default;
}

export default function useApplicationData() {
	const [state, dispatch] = useReducer(reducer, initialValues);

	useEffect(() => {
		async function getDays() {
			try {
				const [days, appointments, interviewers] = await Promise.all([
					Axios.get(`/api/days`).then((res) => res.data),
					Axios.get(`/api/appointments`).then((res) => res.data),
					Axios.get(`/api/interviewers`).then((res) => res.data)
				]);
				dispatch({
					type: SET_APPLICATION_DATA,
					value: {
						days,
						appointments,
						interviewers
					}
				});
			} catch (error) {
				console.log(error);
			}
		}
		getDays();
	}, []);

	const socket = new WebSocket('ws://localhost:8001');

	socket.onmessage = function(event) {
		const parsed = JSON.parse(event.data);

		const appointment = {
			...state.appointments[parsed.id],
			interview: parsed.interview ? { ...parsed.interview } : null
		};

		const appointments = {
			...state.appointments,
			[parsed.id]: appointment
		};

		const days = changeSpots(
			parsed.id,
			parsed.interview ? 'book' : 'cancel'
		);

		parsed.type === 'SET_INTERVIEW' &&
			dispatch({ type: SET_INTERVIEW, value: [appointments, days] });
	};

	const setDay = (day) => dispatch({ type: SET_DAY, value: day });

	const changeSpots = (id, action) => {
		const dayId = Math.ceil(id / 5);
		return state.days.map((item) => {
			if (item.id !== dayId) {
				return item;
			}
			return {
				...item,
				spots:
					action === 'book'
						? item.spots > 0 && item.spots - 1
						: item.spots < 5 && item.spots + 1
			};
		});
	};

	function bookInterview(id, interview) {
		Axios.put(`/api/appointments/${id}`, { interview });
	}

	function cancelInterview(id) {
		Axios.delete(`/api/appointments/${id}`);
	}

	return { state, setDay, bookInterview, cancelInterview };
}
