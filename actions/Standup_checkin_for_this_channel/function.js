function(ellipsis) {
  const EllipsisApi = require('ellipsis-api');
const api = new EllipsisApi(ellipsis).actions;
const standupChannelArgsFor = require('standup-channel-args');

api.run({
  actionName: "Check standup status",
  args: standupChannelArgsFor(ellipsis)
}).then(ellipsis.noResponse);
}
