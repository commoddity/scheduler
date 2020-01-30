### Interview Scheduler

# Pascal van Leeuwen

- A single page web application that allows student to book time with interviewers in one of 5 blocks from Monday to Friday.
- Students can choose their day, select an hour time slot, select an interviewer and create the interview.
- They can also delete their interview, edit their name and change theri interviewer.

## Cloud Hosting

The app is deployed online using a combination of Netlify for the clinet, Heroku for the server and CircleCI for continuous integration.

[Interview Scheduler Deployed on Netlify](https://elegant-heisenberg-653b5a.netlify.com/)

### Stack:

# Front-end:

- [React](https://reactjs.org/)
- [SASS](https://sass-lang.com/)
- [Axios](https://github.com/axios/axios)

# Back-end

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)

# Database

- [PostgreSQL](https://www.postgresql.org/)

# Testing

- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)

# UI component Design

- [Storybook](https://storybook.js.org/)

# Cloud Hosting Services

- [CircleCI](https://circleci.com/)
- [Heroku](https://www.heroku.com/)
- [Netlify](https://www.netlify.com/)

### Screenshots

![Component Tree of the Scheduler App](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler-components.png)
Component Tree of the App
![Component Flow](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler-flow-chart.png)
Component Flow of the App
![Screenshot 1](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler1.png)

![Screenshot 2](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler2.png)

![Screenshot 3](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler3.png)

![Screenshot 4](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler4.png)

![Screenshot 5](https://github.com/Commoddity/scheduler/blob/master/docs/scheduler5.png)

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
