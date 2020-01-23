import React from 'react';

import 'components/Application.scss';

import DayList from 'components/DayList';
import Appointment from './Appointment';

import useApplicationData from 'hooks/useApplicationData.js';

import { getAppointmentsForDay } from 'helpers/selectors';
import { getInterviewersForDay } from 'helpers/selectors';
import { getInterview } from 'helpers/selectors';

export default function Application(props) {
	const {
		state,
		setDay,
		bookInterview,
		cancelInterview
	} = useApplicationData();

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
					<DayList day={state.day} days={state.days} setDay={setDay} />
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
