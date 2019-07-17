const host = 'http://' + window.location.hostname + ':3001';

const apiUrls = {
  activities: host + '/api/activities',
  challenges: host + '/api/challenges',
  scores: host + '/api/scores',
  users: host + '/api/users',
  workouts: host + '/api/workouts'
};

export { apiUrls };
