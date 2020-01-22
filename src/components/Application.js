import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import "components/Appointment";

import DayList from "components/DayList";
import Appointment from "./Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Dwayne \"The Rock\" Johnson",
      interviewer: {
        id: 1,
        name: "Shigeru Miyamoto",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Bernie Sanders",
      interviewer: {
        id: 1,
        name: "Sally Struthers",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "George Costanza",
      interviewer: {
        id: 1,
        name: "Abraham Lincoln",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "3pm",
    interview: {
      student: "Homer Simpson",
      interviewer: {
        id: 1,
        name: "Gomer Pyle",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    async function getDays() {
      try {
        const response = await axios.get(`/api/days`);
        setDays(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDays();
  }, []);

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
