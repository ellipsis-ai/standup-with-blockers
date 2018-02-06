function(ellipsis) {
  const EllipsisApi = require('ellipsis-api');
const api = new EllipsisApi(ellipsis).actions;
const standupChannelArgsFor = require('standup-channel-args');

api.run({
  actionName: "Standup status summary",
  args: standupChannelArgsFor(ellipsis)
}).then(ellipsis.noResponse);
}
