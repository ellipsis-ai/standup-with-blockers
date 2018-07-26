{if successResult.nobodyWasAsked}
Standup hasn't run in {successResult.channelName}. You can set up a new standup using `@{ellipsis.teamInfo.botName} setup standup`
{else}
Here's where everyone's at today:

{for userResult in successResult.answeredResults}

**<@{userResult.user}>:** 

**Yesterday:** {userResult.yesterday}  
    **Today:** {userResult.today}  
 **Blockers:** {userResult.blockers.label}  

{endfor}

{if successResult.hasSlackers}
The following slackers haven't answered yet:

{for slacker in successResult.slackers}
**<@{slacker}>**
{endfor}

{else}
Everyone accounted for. Nicely done.
{endif}

{endif}