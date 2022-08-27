# @notedwin/autocode-discordjs

## Example Usage For Autocode

### **Tools:** get user's publicly displayed badges like hypesquad badge, discord moderator badge, etc.
```js
let { User, Tools } = require('@notedwin/autocode-discordjs');

let user = new User();

Tools.getUserBadges(user.public_flags);
```

### **CreateChannel:** ability to use this class similar like Discord.js to create new channels, set parent (category), set position (position of the channel in a category), and send message to a specific channel.
```js
let { CreateChannel } = require('@notedwin/autocode-discordjs');

let event = context.params.event;

//CreateChannel.create(name, { guild_id, type, topic, bitrate, user_limit, rate_limit_per_user, position, permission_overwrites, parent_id, nsfw });
//bitrate and user_limit is only applicable for voice channels and stage channels.
//check out more about bitrates here by reading the * section: https://discord.com/developers/docs/resources/channel#modify-channel-json-params-guild-channel
//Check out more about channel type here: https://discord.com/developers/docs/resources/channel#channel-object-channel-types

let channel = new CreateChannel(event);

let createdChannel = await channel.create('test-channel', {
    type: 0, //for now, you will have to use the integer type from Discord Dev Portal. An alternative way is coming soon.
    topic: `channel topic here`, //optional
})

//replace the data with the created channel's data if you wanna update the created channel's info.
//use the original context.params.event if you wanna update the current channel's info instead.
channel = new CreateChannel(createdChannel)
await channel.setName('new-channel-name')
await channel.setParent('891309033884094525')
```
