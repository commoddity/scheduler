import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function useApplicationData() {
	const [state, setState] = useState({
		day: 'Monday',
		days: [],
		appointments: {},
		interviewers: {}
	});

	const setDay = (day) => setState({ ...state, day });

	useEffect(() => {
		async function getDays() {
			try {
				const [days, appointments, interviewers] = await Promise.all([
					Axios.get(`/api/days`).then((res) => res.data),
					Axios.get(`/api/appointments`).then((res) => res.data),
					Axios.get(`/api/interviewers`).then((res) => res.data)
				]);
				setState((prev) => ({
					...prev,
					days,
					appointments,
					interviewers
				}));
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
				setState({
					...state,
					appointments
				});
			}
		);
	}

	const cancelInterview = (id) => Axios.delete(`/api/appointments/${id}`);

	return { state, setDay, bookInterview, cancelInterview };
}
