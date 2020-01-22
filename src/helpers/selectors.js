export default function getAppointmentsForDay(state, day) {
  let appointmentsForDay = [];
  const [appointmentObj] = state.days.filter(data => data.name === day);
  if (appointmentObj) {
    const appointments = appointmentObj.appointments.filter(id => id === state.appointments[id].id)
    appointments.forEach((appointment) => appointmentsForDay.push(state.appointments[appointment]))
    return appointmentsForDay;
  } else {
    return [];
  }
}

// The function should return a new object containing the interview data when we pass it an object that contains the interviewer. 
// Otherwise, the function should return null. The object it returns should look like this:

// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }

export function getInterview(state, interview) {

}