const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const CreateChannel = require('./CreateChannel')

class createMessage {
   /**
   * @name MessageEmbed
   * @kind constructor
   */
  
  constructor(data = {}) {
    /**
     * Duplicate all the data key and values
     */
    Object.keys(data).forEach(key => {
      this[key] = data[key] || null
    })
    
    /**
     * CreateChannel Class
     */
    this.channel = new CreateChannel(data)
  }
  
  /**
   * Reply to the author of the command
   * @param {String} [content]
   * @param {Options} [channel_id, embed, tts, components, allowed_mentions]
   */
  async reply(content, { channel_id, embed, tts, components, allowed_mentions }={}) {
    return await lib.discord.channels['@0.1.1'].messages.create({
      content: content,
      channel_id: this.channel_id,
      embed,
      tts,
      components,
      allowed_mentions,
      message_reference : {
        message_id: this.id
      }
    });
  }
  
}

module.exports = createMessage;