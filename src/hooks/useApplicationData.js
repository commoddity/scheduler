import React, { useReducer, useEffect } from 'react';
import Axios from 'axios';

const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

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
		return { ...state, appointments: action.value };
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

		return Axios.put(`/api/appointments/${id}`, { interview }).then(
			(res) => {
				dispatch({
					type: SET_INTERVIEW,
					value: appointments
				});
			}
		);
	}

	const cancelInterview = (id) => Axios.delete(`/api/appointments/${id}`);

	return { state, setDay, bookInterview, cancelInterview };
}
