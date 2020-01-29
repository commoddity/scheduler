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

// Reducer constant definition
const SET_INTERVIEW = 'SET_INTERVIEW';

export default function Application(props) {
	// Import state and functions from useApplicationData hook
	const {
		state,
		setDay,
		bookInterview,
		cancelInterview,
		dispatch
	} = useApplicationData();

	// Sets Interview when Web Socket Message received from Server
	// Message contains ID and interview object
	useEffect(() => {
		socket.onmessage = (event) => {
			const messageData = JSON.parse(event.data);
			setInterviewFromMessage(messageData);
		};
	});

	// Calls reducer dispatch with updated appointment list
	const setInterviewFromMessage = (messageData) => {
		const appointments = changeAppointments(messageData);
		messageData.type === 'SET_INTERVIEW' &&
			dispatch({
				type: SET_INTERVIEW,
				payload: { appointments }
			});
	};

	// Updates appointments object with value received via Web Socket message
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

	// Call selector functions to get data for given day
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

	// Return Application component body
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
