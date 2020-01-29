const lookupTable = {
	SET_DAY: (state, action) => ({ ...state, day: action.value }),
	SET_APPLICATION_DATA: (state, action) => ({ ...state, ...action.value }),
	SET_INTERVIEW: (state, action) => {
		const day = state.days.find((day) => day.name === state.day);
		const dayId = day ? day.id : '';
		const appointmentId = action.payload.appointmentId;
		const currentAppointment = state.appointments[appointmentId];
		const nextAppointment = action.payload.appointments[appointmentId];
		const interviewChanged =
			currentAppointment.interview !== nextAppointment.interview;
		let days = state.days;
		if (interviewChanged && nextAppointment.interview) {
			days = state.days.map((day) => {
				if (day.id !== dayId) {
					return day;
				}
				return {
					...day,
					spots: (day.spots -= 1)
				};
			});
		} else if (interviewChanged && !nextAppointment.interview) {
			days = state.days.map((day) => {
				if (day.id !== dayId) {
					return day;
				}
				return {
					...day,
					spots: (day.spots += 1)
				};
			});
		}
		return {
			...state,
			appointments: action.payload.appointments,
			days
		};
	},
	default: (state, action) => {
		throw new Error(
			`Tried to reduce with unsupported action type: ${action.type}`
		);
	}
};

// const updateDaysObject

export default function reducer(state, action) {
	return lookupTable[action.type]
		? lookupTable[action.type](state, action)
		: lookupTable.default(state, action);
}
