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

const locations = {
  Hämeenlinna: '#008FFB',
  Helsinki: '#31A350',
  Joensuu: '#FEB019',
  Tampere: '#FF4560',
  Turku: '#775DD0',
  Tallinn: '#546E7A',
  Tartu: '#26a69a'
};

export { apiUrls, locations };
