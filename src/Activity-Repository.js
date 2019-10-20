class Activity {
  constructor(activityData) {
    this.activityData = activityData;
  }

  findCurrentUserData(userId) {
    return this.activityData.filter((activityObj) => activityObj.userID === userId);
  }

  findUserCurDate(date) {
    return this.activityData.filter((activityObj) => activityObj.date === date);
  }

  returnUserAvgsByDate(date, key)  {
    let allUsersActivity = this.findUserCurDate(date);
    let allUsersTotal = allUsersActivity.reduce((activityObjA, activityObjB) => activityObjA + activityObjB[key], 0);
    return parseInt(allUsersTotal / allUsersActivity.length);
  }

  returnMilesWalkedByDate(user, date) {
    let numOfSteps = this.activityData.find(activityObj => activityObj.userID === user.id && activityObj.date === date).numSteps;
    return parseInt(((numOfSteps * user.strideLength) / 5280).toFixed(0));
  } 

  returnActivityByDate(userId, date, key) {
    return this.findCurrentUserData(userId).find(elem => {
      return elem.date === date
    })[key];
  }

  returnActiveMinutesByDate(userId, date) {
    return this.findCurrentUserData(userId).find(elem => {
      return elem.date === date
    }).minutesActive
  } 
  returnNumberOfStepsByDate(userID, date) {
    return this.findCurrentUserData(userID).find((element) => {
      return element.date === date;
    }).numSteps;
  }

  returnStairsClimbedByDate(userID, date) {
    return this.findCurrentUserData(userID).find((element) => {
      return element.date === date;
    }).flightsOfStairs;
  }

  returnAvgActiveMinutesByWeek(userId, date) {
    let index = this.findCurrentUserData(userId).findIndex((activityObj) => activityObj.date === date);
    let userActiveMins = this.findCurrentUserData(userId).map(activityObj => activityObj.minutesActive).splice(index - 6, 7);
    return parseInt(userActiveMins.reduce((totalMins, dailyActiveMins) => {
      totalMins += dailyActiveMins;
      return totalMins;
    }, 0) / 7);
  } 

  returnUserActivityByWeek(userId, date, key) {
    let index = this.findCurrentUserData(userId).findIndex((activityObj) => activityObj.date === date);
    return this.findCurrentUserData(userId).map(activityObj => activityObj[key]).splice(index - 6, 7);
  }

  checkStepGoalMetByDate(user, date) {
    if ((user.dailyStepGoal) <= (this.findCurrentUserData(user.id).find(elem => elem.date === date).numSteps)) {
      return true;
    }
    return false; 
  } 

  returnAllDaysStepGoalExceeded(user) {
    return this.activityData.filter((activityObj) => activityObj.userID === user.id && activityObj.numSteps > user.dailyStepGoal).map(activityObj => activityObj.date);
  } 

  returnStairClimbingRecord(userId) {
    return this.findCurrentUserData(userId).sort((value1, value2) => {
      return value2.flightsOfStairs - value1.flightsOfStairs
    })[0].flightsOfStairs
  }

  checkUserActivityStatusByDate(userID, date) {
    if ((this.findCurrentUserData(userID).find(day => {
      return day.date === date;
    }).minutesActive) >= (90)) {
      return true;
    }
    return false;
  }

  returnThreeDayStepStreak(userID) {
    let userData = this.findCurrentUserData(userID);
    return userData.reduce((acc, day, index) => {
      if (index < 2) {
        return acc;
      }
      if ((day.numSteps > userData[index - 1].numSteps) && (userData[index - 1].numSteps > userData[index - 2].numSteps)) {
        acc.push({
          [userData[index].date]: userData[index].numSteps,
          [userData[index - 1].date]: userData[index - 1].numSteps,
          [userData[index - 2].date]: userData[index - 2].numSteps,
        });
      }
      return acc;
    }, []);
  }

  republicPlazaChallenge(userID) {
    let userData = this.findCurrentUserData(userID);
    return parseInt((userData.reduce((acc, day) => {
      acc += day.flightsOfStairs;
      return acc;
    }, 0) / 56));
  }

}

export default Activity;