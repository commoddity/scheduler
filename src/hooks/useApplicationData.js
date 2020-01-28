import React, { useReducer, useEffect } from 'react';
import Axios from 'axios';

//Reducer Variables and Configuration
const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

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
	}),
	default: initialValues
};

function reducer(state, action) {
	return lookupTable[action.type]
		? lookupTable[action.type](state, action)
		: lookupTable.default;
}

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

	// Web Socket Configuration - localhost:8001 is API port
	const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

	socket.onmessage = function(event) {
		const parsed = JSON.parse(event.data);
		setInterviewFromMessage(parsed);
	};

	// Reducer Setter Functions
	const setInterviewFromMessage = (message) => {
		const appointments = changeAppointments(message);
		const days = changeSpots(
			message.id,
			message.interview ? 'book' : 'cancel'
		);
		message.type === 'SET_INTERVIEW' &&
			dispatch({ type: SET_INTERVIEW, value: [appointments, days] });
	};

	const setDay = (day) => dispatch({ type: SET_DAY, value: day });

	// Reducer Value Constructor Functions
	const changeAppointments = (messageData) => {
		const appointment = {
			...state.appointments[messageData.id],
			interview: messageData.interview
				? { ...messageData.interview }
				: null
		};
		const appointments = {
			...state.appointments,
			[messageData.id]: appointment
		};
		return appointments;
	};

	const changeSpots = (id, action) => {
		const dayId = Math.ceil(id / 5);
		return state.days.map((day) => {
			if (day.id !== dayId) {
				return day;
			}
			return {
				...day,
				spots:
					action === 'book'
						? day.spots > 0 && day.spots - 1
						: day.spots < 5 && day.spots + 1
			};
		});
	};

	// API Interview Setter Functions
	function bookInterview(id, interview) {
		Axios.put(`/api/appointments/${id}`, { interview });
	}

	function cancelInterview(id) {
		Axios.delete(`/api/appointments/${id}`);
	}

	// Exported Props/Functions
	return { state, setDay, bookInterview, cancelInterview };
}
