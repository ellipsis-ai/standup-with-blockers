function(channel, ellipsis) {
  const groupBy = require('group-by');
const moment = require('moment-timezone');
const getActionLogs = require('ellipsis-action-logs').get;
const from = moment.tz(new Date(), ellipsis.teamInfo.timeZone).startOf('day').toDate();
const channelName = channel === "this channel" ?
      '#' + ellipsis.userInfo.messageInfo.details.channelName :
      channel.trim().replace(/^([^#])/, "#$1");
function mostRecentByUserIn(arr) {
  const byUser = groupBy(arr, "userIdForContext");
  const userResults = [];
  Object.keys(byUser).forEach(key => {
    const pv = byUser[key].sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)[0].paramValues;
    userResults.push(Object.assign({}, pv, {user: key}));
  });
  return userResults;
}

function filteredByChannel(actionLogs) {
  return actionLogs.filter(ea => {
    return ea.paramValues.channel && (ea.paramValues.channel.trim() === channelName);
  });
}

function statusAnswers() {
  return new Promise((resolve, reject) => {
    getActionLogs({ 
      action: "Answer status questions",
      from: from,
      to: new Date(),
      ellipsis: ellipsis,
      success: resolve,
      error: reject
    });
  }).then(filteredByChannel);
}

function usersAsked() {
  return new Promise((resolve, reject) => {
    getActionLogs({
      action: "Check standup status",
      from: from,
      to: new Date(),
      ellipsis: ellipsis,
      success: resolve,
      error: reject
    });
  }).then(filteredByChannel);
}

const NO_RESPONSE = "_(no response yet)_";
 
usersAsked().then(usersAskedResponse => {
  const askedByUser = mostRecentByUserIn(usersAskedResponse);
  statusAnswers().then(response => {
    const results = mostRecentByUserIn(response);
    const answeredResults = results.map(ea => {
      return {
        user: ea.user,
        yesterday: (ea.yesterday ? ea.yesterday : NO_RESPONSE),
        today: (ea.today ? ea.today : NO_RESPONSE),
        blockers: (ea.blockers ? ea.blockers : NO_RESPONSE)
      };
    });
    const slackers = askedByUser.filter(eaAsked => {
      return results.findIndex(eaAnswered => eaAnswered.user === eaAsked.user) === -1;
    }).map(ea => ea.user);
    ellipsis.success({
      answeredResults: answeredResults,
      slackers: slackers,
      hasSlackers: slackers.length > 0,
      nobodyWasAsked: askedByUser.length === 0,
      channelName: channelName
    });
  });
});
}
