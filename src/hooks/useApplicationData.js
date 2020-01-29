import React, { useReducer, useEffect } from 'react';
import Axios from 'axios';

import reducer from 'reducers/application';

//Reducer Variables and Configuration
const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';

const initialValues = {
	day: 'Monday',
	days: [],
	appointments: {},
	interviewers: {}
};

//Hook Function Body
export default function useApplicationData() {
	//useReducer call to set state.
	const [state, dispatch] = useReducer(reducer, initialValues);

	//Initial Page Load useEffect - loads appointments from API
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

	const setDay = (day) => dispatch({ type: SET_DAY, value: day });

	// API Interview Setter Functions
	function bookInterview(id, interview) {
		Axios.put(`/api/appointments/${id}`, { interview });
	}

	function cancelInterview(id) {
		Axios.delete(`/api/appointments/${id}`);
	}

	// Exported Props/Functions
	return { state, setDay, bookInterview, cancelInterview, dispatch };
}
