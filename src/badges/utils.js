const checkRequirement = (achievement, score) => {
  const result = score >= achievement.requirement;
  console.log(achievement, score, result);

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

export { checkAchievements };
