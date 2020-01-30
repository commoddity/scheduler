# Interview Scheduler

### Lighthouse Labs Week 8 - Pascal van Leeuwen - React Project

- A single page web application that allows student to book time with interviewers in one of 5 blocks from Monday to Friday.
- Students can choose their day, select an hour time slot, select an interviewer and create the interview.
- They can also delete their interview, edit their name and change their interviewer.
- The main [Scheduler](https://elegant-heisenberg-653b5a.netlify.com/) app was created using [React Hooks](https://reactjs.org/docs/hooks-intro.html).
- The supplementary [Scheduler Dashboard](https://naughty-yonath-3da90b.netlify.com/) app was created using [React class components](https://reactjs.org/docs/react-component.html).

- _All stretch work completed: web sockets and cloud deployment._

# Scheduler - _Deployed_

The app is deployed online using Netlify for the client, Heroku for the server and CircleCI for continuous integration.

[Interview Scheduler Deployed Link](https://elegant-heisenberg-653b5a.netlify.com/)

# Scheduler Dashboard - _Deployed_

- A separate Scheduler Dashboard application is also deployed, which provides the following information from the Scheduler App in real time:
  - _Total Interviews_
  - _Least Popular Time Slot_
  - _Most Popular Day_
  - _Average Interviews Per Day_

[Interview Scheduler Dashboard Deployed Link](https://naughty-yonath-3da90b.netlify.com/)

# Stack:

## Front-end:

- [React](https://reactjs.org/)
- [SASS](https://sass-lang.com/)
- [Axios](https://github.com/axios/axios)

## Back-end

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) _(Stretch)_

## Database

- [PostgreSQL](https://www.postgresql.org/)

## Testing

- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)

## UI Component Design

- [Storybook](https://storybook.js.org/)

## Cloud Hosting Services

- [CircleCI](https://circleci.com/) _(Stretch)_
- [Heroku](https://www.heroku.com/) _(Stretch)_
- [Netlify](https://www.netlify.com/) _(Stretch)_

# Screenshots

### Component Tree of the App

![Component Tree of the Scheduler App](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler-components.png)

### Component Flow of the App

![Component Flow](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler-flow-chart.png)

### Main View

![Screenshot 1](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler1.png)

### Delete Confirmation View

![Screenshot 2](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler2.png)

### Deleting Status

![Screenshot 3](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler3.png)

### Edit Existing Appointment

![Screenshot 4](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler4.png)

### Saving Status

![Screenshot 5](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler5.png)

### Scheduler Dashboard App

![Screenshot 5](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler-dash.png)

_Screenshots shown use the [Dark Reader](https://chrome.google.com/webstore/detail/dark-reader/eimadpbcbfnmbkopoojfekhnkhdbieeh?hl=en) add-on for [Google Chrome](https://www.google.com/chrome/). Actual appearance may vary._

### Setup Instructions

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
