import React, { useState, useEffect } from "react";
import Axios from "axios";

import "components/Application.scss";

import "components/Appointment";

import DayList from "components/DayList";
import Appointment from "./Appointment";
import getAppointmentsForDay from "helpers/selectors"

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    async function getDays() {
      try {
        const [days, appointments] = await Promise.all([
          Axios.get(`/api/days`).then(res => res.data),
          Axios.get(`/api/appointments`).then(res => res.data)
        ])
        console.log([days, appointments]);
        setState(prev => ({ ...prev, days, appointments }))
      } catch (error) {
        console.log(error);
      }
    }
    getDays();
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            day={state.day}
            days={state.days}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map((appointment) => {
          return (
            <Appointment
              key={appointment.id}
              {...appointment}
            />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
