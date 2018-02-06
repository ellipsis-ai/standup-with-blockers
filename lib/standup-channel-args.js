/*
@exportId kfQvWcMsSmmIT7jO8E99zg
*/
module.exports = (function() {
return ellipsis => {
  const candidateChannel = ellipsis.userInfo.messageInfo.details.channelName;
  if (candidateChannel[0] === "D") {
    return []; 
  } else {
    return [ { name: "channel", value: candidateChannel } ]; 
  }
};
})()
     