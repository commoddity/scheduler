export function getAppointmentsForDay(state, day) {
	let appointmentsForDay = [];
	const [appointmentObj] = state.days.filter((data) => data.name === day);
	if (!appointmentObj) {
		return [];
	} else {
		const appointments = appointmentObj.appointments.filter(
			(id) => id === state.appointments[id].id
		);
		appointments.forEach((appointment) =>
			appointmentsForDay.push(state.appointments[appointment])
		);
		return appointmentsForDay;
	}
}

export function getInterviewersForDay(state, day) {
	let interviewersForDay = [];
	const [interviewerObj] = state.days.filter((data) => data.name === day);
	if (!interviewerObj) {
		return [];
	} else {
		const interviewers = interviewerObj.interviewers.filter(
			(id) => id === state.interviewers[id].id
		);
		interviewers.forEach((interviewer) =>
			interviewersForDay.push(state.interviewers[interviewer])
		);
		return interviewersForDay;
	}
}

export function getInterview(state, interview) {
	if (!interview) {
		return null;
	} else {
		const interviewerId = interview.interviewer;
		const interviewObj = {
			student: interview.student,
			interviewer: state.interviewers[interviewerId]
		};
		return interviewObj;
	}
}
