import React, { useEffect } from 'react';

import 'components/Application.scss';

import DayList from 'components/DayList';
import Appointment from './Appointment';

import useApplicationData from 'hooks/useApplicationData.js';

import { getAppointmentsForDay } from 'helpers/selectors';
import { getInterviewersForDay } from 'helpers/selectors';
import { getInterview } from 'helpers/selectors';

// Web Socket Configuration - localhost:8001 is API port
const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

const SET_INTERVIEW = 'SET_INTERVIEW';

export default function Application(props) {
	const {
		state,
		setDay,
		bookInterview,
		cancelInterview,
		dispatch
	} = useApplicationData();

	useEffect(() => {
		socket.onmessage = (event) => {
			const parsedData = JSON.parse(event.data);
			setInterviewFromMessage(parsedData);
		};
	});

	// Reducer Value Constructor Functions
	const changeAppointments = (messageData) => {
		const appointment = {
			...state.appointments[messageData.id],
			interview: messageData.interview ? { ...messageData.interview } : null
		};
		const appointments = {
			...state.appointments,
			[messageData.id]: appointment
		};
		return appointments;
	};

	// Reducer Setter Functions
	const setInterviewFromMessage = (message) => {
		const appointments = changeAppointments(message);
		const appointmentId = message.id;
		message.type === 'SET_INTERVIEW' &&
			dispatch({
				type: SET_INTERVIEW,
				payload: {
					appointments,
					appointmentId
				}
			});
	};

	const interviewers = getInterviewersForDay(state, state.day);
	const appointments = getAppointmentsForDay(state, state.day).map(
		(appointment) => {
			return (
				<Appointment
					key={appointment.id}
					{...appointment}
					interview={getInterview(state, appointment.interview)}
					interviewers={interviewers}
					bookInterview={bookInterview}
					cancelInterview={cancelInterview}
				/>
			);
		}
	);

	return (
		<main className='layout'>
			<section className='sidebar'>
				<img
					className='sidebar--centered'
					src='images/logo.png'
					alt='Interview Scheduler'
				/>
				<hr className='sidebar__separator sidebar--centered' />
				<nav className='sidebar__menu'>
					<DayList
						day={state.day}
						spots={state.spots}
						days={state.days}
						setDay={setDay}
					/>
				</nav>
				<img
					className='sidebar__lhl sidebar--centered'
					src='images/lhl.png'
					alt='Lighthouse Labs'
				/>
			</section>
			<section className='schedule'>
				{appointments}
				<Appointment key='last' time='5pm' />
			</section>
		</main>
	);
}
