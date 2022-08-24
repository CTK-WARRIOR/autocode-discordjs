const lib = require('lib')({ token: process.env.STDLIB_SECRET_TOKEN });

class channel {
  constructor(data = {}) {
    
    if ('name' in data) {
      /**
       * The name of the guild channel
       * @type {string}
       */
      this.name = data.name;
    }

    if ('position' in data) {
      /**
       * The raw position of the channel from Discord
       * @type {number}
       */
      this.rawPosition = data.position;
    }
    
    if ('guild_id' in data) {
      this.guildId = data.guild_id;
    }

    if ('parent_id' in data) {
      /**
       * The id of the category parent of this channel
       * @type {?Snowflake}
       */
      this.parentId = data.parent_id;
    }
    if ('permission_overwrites' in data) {
      this.permissionOverwrites.cache.clear();
      for (const overwrite of data.permission_overwrites) {
        this.permissionOverwrites._add(overwrite);
      }
    }
    
    this.id = data.channel_id || null;
  }

  async send(content, { channel_id, embed, tts, components, allowed_mentions, message_reference, attachments } = {}) {
    return await lib.discord.channels['@0.3.2'].messages.create({
      content: content,
      channel_id: channel_id || this.id,
      attachments,
      embed,
      tts,
      components,
      allowed_mentions,
      message_reference
    });
  }
  
  async create(name, { guild_id, type, topic, bitrate, user_limit, rate_limit_per_user, position, permission_overwrites, parent_id, nsfw } = {}) {
    return await lib.discord.guilds['@0.2.4'].channels.create({
      guild_id: guild_id ? guild_id : this.guildId,
      name,
      type,
      topic,
      bitrate,
      user_limit,
      rate_limit_per_user,
      position,
      permission_overwrites,
      parent_id,
      nsfw,
    });
  }
  
  async setName(name) {
    return await lib.discord.channels['@0.3.2'].update({
      channel_id: `${this.id}`,
      name,
    });
  }
  
  async setParent(parent_id = '', options = {}){
    return await lib.discord.guilds['@0.2.4'].channels.update({
      guild_id: `${this.guildId}`,
      id: `${this.id}`,
      parent_id,
    });
  }
  
  async setPosition(position, options = {}) {
    return await lib.discord.guilds['@0.2.4'].channels.update({
      guild_id: `${this.guildId}`,
      id: `${this.id}`,
      position,
    });
  }
}

module.exports = channel;
