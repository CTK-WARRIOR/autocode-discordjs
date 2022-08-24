# @autocode/discordjs

## Example Usage For Autocode

### **Tools:** get user's publicly displayed badges like hypesquad badge, discord moderator badge, etc.
```js
let { User, Tools } = require('autocode-discordjs');

let user = new User();

Tools.getUserBadges(user.public_flags);
```

### **CreateChannel:** ability to use this class similar like Discord.js to create new channels, set parent (category), set position (position of the channel in a category), and send message to a specific channel.
```js
let { CreateChannel } = require('autocode-discordjs');

let event = context.params.event;

//CreateChannel.create(name, { guild_id, type, topic, bitrate, user_limit, rate_limit_per_user, position, permission_overwrites, parent_id, nsfw });
//bitrate and user_limit is only applicable for voice channels and stage channels.
//check out more about bitrates here by reading the * section: https://discord.com/developers/docs/resources/channel#modify-channel-json-params-guild-channel
//Check out more about channel type here: https://discord.com/developers/docs/resources/channel#channel-object-channel-types

CreateChannel.create('test-channel', 
{
    type: 0, //for now, you will have to use the integer type from Discord Dev Portal. An alternative way is coming soon.
    topic: `channel topic here`, //optional
}).then ((channel) => {
    console.log(channel.name)
    //don't like the channel name?
    //you can set a new channel name and new category both at the same time!
    channel.setName('new-channel-name').setParent('0000000000000')
})
```