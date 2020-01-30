// Reducer function methods stored in lookupTable
const lookupTable = {
	// Selects day when selected by user in application sidebar
	SET_DAY: (state, action) => ({ ...state, day: action.payload }),

	// Gets data and updates state via useEffect when page initially rendered
	SET_APPLICATION_DATA: (state, action) => ({ ...state, ...action.payload }),

	// Sets interview data when appointment saved, edited or deleted by user
	SET_INTERVIEW: (state, action) => {
		// Gets given day ID number from day name in state
		const day = state.days.find((day) => day.name === state.day);
		const dayId = day ? day.id : '';
		// Dynamically calculates spots available for selected day
		const appointmentsForSelectedDay = state.days[dayId - 1].appointments;
		let spotsAvailable = 0;
		for (const appointmentId in action.payload.appointments) {
			const selectedAppointment = action.payload.appointments[appointmentId];
			if (
				appointmentsForSelectedDay.includes(selectedAppointment.id) &&
				selectedAppointment.interview === null
			) {
				spotsAvailable = spotsAvailable + 1;
			}
		}
		// Constructs days array with updated spots available
		const days = state.days.map((day) => {
			if (day.id !== dayId) {
				return day;
			}
			return {
				...day,
				spots: spotsAvailable
			};
		});
		// Returns state with updated appointment list and days array
		return {
			...state,
			appointments: action.payload.appointments,
			days
		};
	},

	// Error handling for mode transitions
	default: (state, action) => {
		throw new Error(
			`Tried to reduce with unsupported action type: ${action.type}`
		);
	}
};

// Reducer function calls dispatch with lookup table methods
export default function reducer(state, action) {
	return lookupTable[action.type]
		? lookupTable[action.type](state, action)
		: lookupTable.default(state, action);
}
