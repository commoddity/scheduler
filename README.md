# Interview Scheduler

### Lighthouse Labs W08 - Pascal van Leeuwen - React Project

- A single page web application that allows student to book time with interviewers in one of 5 blocks from Monday to Friday.
- Students can choose their day, select an hour time slot, select an interviewer and create the interview.
- They can also delete their interview, edit their name and change theri interviewer.
- _All stretch work completed: web sockets and cloud deployment._

## Deployed Application

The app is deployed online using Netlify for the client, Heroku for the server and CircleCI for continuous integration.

## Link:

[Interview Scheduler Deployed Link](https://elegant-heisenberg-653b5a.netlify.com/)

# Stack:

## Front-end:

- [React](https://reactjs.org/)
- [SASS](https://sass-lang.com/)
- [Axios](https://github.com/axios/axios)

# Back-end

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) _(Stretch)_

# Database

- [PostgreSQL](https://www.postgresql.org/)

# Testing

- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)

# UI component Design

- [Storybook](https://storybook.js.org/)

# Cloud Hosting Services

- [CircleCI](https://circleci.com/) _(Stretch)_
- [Heroku](https://www.heroku.com/) _(Stretch)_
- [Netlify](https://www.netlify.com/) _(Stretch)_

# Screenshots

![Component Tree of the Scheduler App](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler-components.png)
Component Tree of the App
![Component Flow](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler-flow-chart.png)
Component Flow of the App
![Screenshot 1](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler1.png)

![Screenshot 2](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler2.png)

![Screenshot 3](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler3.png)

![Screenshot 4](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler4.png)

![Screenshot 5](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler5.png)

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
