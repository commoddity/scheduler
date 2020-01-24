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

function reducer(state, action) {
	if (action.type === 'SET_DAY') {
		return { ...state, day: action.value };
	} else if (action.type === 'SET_APPLICATION_DATA') {
		return { ...state, ...action.value };
	} else if (action.type === 'SET_INTERVIEW') {
		return {
			...state,
			appointments: action.value[0],
			days: action.value[1]
		};
	} else if (action.type === 'DELETE_INTERVIEW') {
		return { ...state, days: action.value };
	} else {
		return initialValues;
	}
}

export default function useApplicationData() {
	const [state, dispatch] = useReducer(reducer, initialValues);

	const setDay = (day) => dispatch({ type: SET_DAY, value: day });

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

	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview }
		};

		const appointments = {
			...state.appointments,
			[id]: appointment
		};

		const dayId = Math.ceil(id / 5);

		const days = state.days.map((item) => {
			if (item.id !== dayId) {
				return item;
			}
			return {
				...item,
				spots: item.spots > 0 && item.spots - 1
			};
		});

		return Axios.put(`/api/appointments/${id}`, { interview }).then(
			(res) => {
				dispatch({
					type: SET_INTERVIEW,
					value: [appointments, days]
				});
			}
		);
	}

	const cancelInterview = (id) => {
		const dayId = Math.ceil(id / 5);

		const days = state.days.map((item) => {
			if (item.id !== dayId) {
				return item;
			}
			return {
				...item,
				spots: item.spots < 5 && item.spots + 1
			};
		});

		return Axios.delete(`/api/appointments/${id}`).then((res) => {
			dispatch({
				type: DELETE_INTERVIEW,
				value: days
			});
		});
	};

	return { state, setDay, bookInterview, cancelInterview };
}
