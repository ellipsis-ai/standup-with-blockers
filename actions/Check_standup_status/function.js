function(channel, ellipsis) {
  const RandomResponse = require('ellipsis-random-response');

const successResult = {
  greeting: RandomResponse.greetingForTimeZone(ellipsis.teamInfo.timeZone),
  intro: `This is a standup checkin for ${channel}.`,
  instruction: "Click the button when you're ready to answer today's standup questions."
};
ellipsis.success(successResult, {
  choices: [{
    label: "I'm ready",
    actionName: "Answer status questions",
    args: [ { name: "channel", value: channel }]
  }]
});
}
