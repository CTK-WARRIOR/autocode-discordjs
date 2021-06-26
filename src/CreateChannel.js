const lib = require('lib')({ token: process.env.STDLIB_SECRET_TOKEN });

class createChannel {
  constructor(data = {}) {
    this.id = data.channel_id || null
  }

  async send(content, { channel_id, embed, tts, components, allowed_mentions, message_reference } = {}) {
    return await lib.discord.channels['@0.1.1'].messages.create({
      content: content,
      channel_id: channel_id || this.id,
      embed,
      tts,
      components,
      allowed_mentions,
      message_reference
    });
  }

}

module.exports = createChannel;