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

// list of manually added and cleaned SVG files
const icons = [
  'icon.svg',
  'cycling.svg',
  'kettlebell.svg',
  'plank.svg',
  'pullup.svg',
  'pushup.svg',
  'walking.svg',
  'challenge.svg',
  'olympics.svg'
];

export { apiUrls, locations, icons };
