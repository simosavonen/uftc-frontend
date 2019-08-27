<div align="center">
<a href="" rel="noopener"><img width=200px height=200px src="./src/logos/plank_over_red_circle.png" alt="UFTC project logo"></a>
</div>

<div align="center"><h3>Ultimate Functional Training Challenge</h3></div>

<div align="center">
 <a href="https://github.com/simosavonen/uftc-frontend/issues" rel="noopener">
 <img alt="GitHub issues" src="https://img.shields.io/github/issues/simosavonen/uftc-frontend"></a>
 <a href="https://github.com/simosavonen/uftc-frontend/blob/master/LICENSE" rel="noopener">
 <img alt="GitHub" src="https://img.shields.io/github/license/simosavonen/uftc-frontend"></a>
 <a href="https://github.com/simosavonen/uftc-frontend/graphs/contributors" rel="noopener"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/simosavonen/uftc-frontend"></a>
 <a href="https://github.com/simosavonen/uftc-frontend/commits/master" rel="noopener"><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/simosavonen/uftc-frontend"></a>
</div>

---

<p>
 A single-page applipation for a team to track their progress in the Ultimate Functional Training Challenge, a fun exercise competition designed to promote an active lifestyle and get software engineers up from their desks during the work day.
 </p>

<p>
Participants record their exercises and gain points, trying to reach a set goal. Upon gaining enough points on a single activity, or during a special one-day-challenge, participants are rewarded with badges.
</p>

## 🧐 About <a name = "about"></a>

<p>
This was a capstone project for a University of Turku <a href="https://tech.utu.fi/fi/full-stack/" rel="noopener">Full Stack bootcamp</a>, which took place between March and August of 2019. A <a href="https://github.com/simosavonen/uftc-frontend/graphs/contributors" rel="noopener">team of five</a> was given two months and free hands to design and build it. Original concept and support was provided by <a href="https://www.ambientia.fi/">Ambientia</a>.
</p>

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you have a recent version of <a href="https://nodejs.org/en/" rel="noopener">Node.js</a> installed.

For this React frontend to work, start the <a href="https://github.com/simosavonen/uftc-backend" rel="noopener">backend server</a> on the same machine.

### Installing

Clone the repository.

```
git clone https://github.com/simosavonen/uftc-frontend.git
cd uftc-frontend
```

Install Node.js modules.

```
npm install
```

Start the application in development mode.

```
npm start
```

Navigate to http://localhost:3000 and you should see the login page.

## 🎈 Usage <a name="usage"></a>

The application is meant to be used by a closed group of people, like a company's employees. Therefore, creating an account works only when you enter the site at http://localhost:3000/login/secret where the term 'secret' matches the one set in the backend .env file for environment variables.

## 🚀 Deployment <a name = "deployment"></a>

The application assumes to find the <a href="https://github.com/simosavonen/uftc-backend" rel="noopener">backend server</a> running on the same host. Edit the file 'config/config.js' if this is not the case.

To build a production version.

```
npm run build
```

Copy the contents of the 'build' folder into your web server.

## 🍭 Cypress end-to-end testing

In the branch **mm_test** there is a set of end-to-end Cypress tests.

```
git checkout mm_test
npm install
npm start
```

Running the tests requires the <a href="https://github.com/simosavonen/uftc-backend" rel="noopener">backend server</a> was started in **test mode**.

Make sure the .env file has defined a TEST_MONGODB_URI which is different from your development database, since the tests delete all data from Mongo.

```
git checkout mm_test
npm run watch:test
```

In the frontend folder, start the Cypress tests with

```
npm run cypress:open
```

After Cypress finishes loading, you can click at the button **run all specs** which launches a battery of tests.

## ⛏️ Built Using <a name = "built_using"></a>

- [ReactJs](https://reactjs.org/) - Web Framework
- [Bulma](https://bulma.io/) - CSS Framework
- [ApexCharts](https://apexcharts.com/) - Charting library
- [Moment](https://momentjs.com/) - Date & Time handling
- [React-toastify](https://fkhadra.github.io/react-toastify/) - Notifications
- [Sweetalert2](https://sweetalert2.github.io/) - Popup alerts
- [Cypress](https://www.cypress.io/) - End-to-end testing

## ✍️ Authors <a name = "authors"></a>

- [@shonkala](https://github.com/shonkala) - Achievements, popup alerts, series selection
- [@simosavonen](https://github.com/simosavonen) - Leaderboard, Top5, admin tools
- [@MMattila75](https://github.com/MMattila75) - Recent activities, Cypress testing
- [@jarigithub](https://github.com/jarigithub) - User profile, data input forms
- [@SirjeH](https://github.com/SirjeH) - UX design, communications

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- [FullStackOpen](https://fullstackopen.com/) - Helsinki University's free course material
- [Ambientia](https://www.ambientia.fi/) - Original concept, support and guidance
- [University of Turku](https://tech.utu.fi/fi/full-stack/) - Full Stack bootcamp
