import moment from 'moment';

const checkRequirement = (achievement, score) => {
  const result = score >= achievement.requirement;
  return result;
};

const activityScore = (workout, activity) => {
  if (!workout) {
    return 0;
  } else {
    const amount = workout.instances.reduce((sum, i) => sum + i.amount, 0);
    return activity.points * amount;
  }
};

const activityValue = (workout, activities) => {
  return activities.find(a => a.id === workout.activity).points;
};

const dayScore = (workouts, activities, date) => {
  if (!workouts) {
    return 0;
  } else {
    const score = workouts.reduce((sum, w) => {
      const cDate = moment(date);
      const dayInstance = w.instances.find(i => {
        const iDate = moment(i.date);
        return iDate.isSame(cDate, 'day');
      });
      if (dayInstance) {
        return sum + dayInstance.amount * activityValue(w, activities);
      } else return sum;
    }, 0);

    return score;
  }
};

const checkAchievements = (workouts, activities, achievements) => {
  if (workouts.length && activities.length && achievements.length) {
    return achievements
      .filter(ach => ach.activity !== null)
      .filter(ach => {
        return checkRequirement(
          ach,
          activityScore(
            workouts.find(w => w.activity === ach.activity),
            activities.find(a => a.id === ach.activity)
          )
        );
      });
  } else return [];
};

const checkDailyChallenges = (workouts, activities, achievements) => {
  return achievements
    .filter(ach => ach.date !== null)
    .filter(ach => checkRequirement(ach, dayScore(workouts, activities, ach.date)));
};

const badgeRewardsTotal = achievements => {
  return achievements.reduce((sum, a) => (sum = sum + a.pointsReward), 0);
};

export { checkAchievements, checkDailyChallenges, badgeRewardsTotal };
