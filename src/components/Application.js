import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import 'components/Application.scss';

// import "components/Appointment";

import DayList from 'components/DayList';
import Appointment from './Appointment';

import { getAppointmentsForDay } from 'helpers/selectors';
import { getInterviewersForDay } from 'helpers/selectors';
import { getInterview } from 'helpers/selectors';

export default function Application(props) {
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

	const appointments = getAppointmentsForDay(state, state.day);
	const interviewers = getInterviewersForDay(state, state.day);

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

	const schedule = appointments.map((appointment) => {
		const interview = getInterview(state, appointment.interview);
		return (
			<Appointment
				key={appointment.id}
				id={appointment.id}
				time={appointment.time}
				interview={interview}
				interviewers={interviewers}
				bookInterview={bookInterview}
				cancelInterview={cancelInterview}
			/>
		);
	});

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
					<DayList day={state.day} days={state.days} setDay={setDay} />
				</nav>
				<img
					className='sidebar__lhl sidebar--centered'
					src='images/lhl.png'
					alt='Lighthouse Labs'
				/>
			</section>
			<section className='schedule'>
				{schedule}
				<Appointment key='last' time='5pm' />
			</section>
		</main>
	);
}
