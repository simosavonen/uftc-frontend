let host = '';

if (process.env.NODE_ENV === 'development') {
  host = 'http://' + window.location.hostname + ':3001';
}

const apiUrls = {
  activities: host + '/api/activities',
  achievements: host + '/api/achievements',
  challenges: host + '/api/challenges',
  scores: host + '/api/scores',
  users: host + '/api/users',
  workouts: host + '/api/workouts',
  forgotpassword: host + '/api/passwords'
};

export { apiUrls };
