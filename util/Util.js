const { Colors } = require('./Constants')

class Util {
  
  /**
   * Data that can be resolved to give a string. This can be:
   * * A string
   * * An array (joined with a new line delimiter to give a string)
   * * Any value
   * @typedef {string|Array|*} StringResolvable
   */
  
  /**
   * Resolves a StringResolvable to a string.
   * @param {StringResolvable} data The string resolvable to resolve
   * @returns {string}
   */
  static resolveString(data) {
    if (typeof data === 'string') return data;
    if (Array.isArray(data)) return data.join('\n');
    return String(data);
  }
  
  
  
  /**
   * Can be a number, hex string, an RGB array like:
   * ```js
   * [255, 0, 255] // purple
   * ```
   * or one of the following strings:
   * - `DEFAULT`
   * - `WHITE`
   * - `AQUA`
   * - `GREEN`
   * - `BLUE`
   * - `YELLOW`
   * - `PURPLE`
   * - `LUMINOUS_VIVID_PINK`
   * - `GOLD`
   * - `ORANGE`
   * - `RED`
   * - `GREY`
   * - `DARKER_GREY`
   * - `NAVY`
   * - `DARK_AQUA`
   * - `DARK_GREEN`
   * - `DARK_BLUE`
   * - `DARK_PURPLE`
   * - `DARK_VIVID_PINK`
   * - `DARK_GOLD`
   * - `DARK_ORANGE`
   * - `DARK_RED`
   * - `DARK_GREY`
   * - `LIGHT_GREY`
   * - `DARK_NAVY`
   * - `BLURPLE`
   * - `GREYPLE`
   * - `DARK_BUT_NOT_BLACK`
   * - `NOT_QUITE_BLACK`
   * - `RANDOM`
   * @typedef {string|number|number[]} ColorResolvable
   */
  
  /**
   * Resolves a ColorResolvable into a color number.
   * @param {ColorResolvable} color Color to resolve
   * @returns {number} A color
   */
  static resolveColor(color) {
    if (typeof color === 'string') {
      if (color === 'RANDOM') return Math.floor(Math.random() * (0xffffff + 1));
      if (color === 'DEFAULT') return 0;
      color = Colors[color] || parseInt(color.replace('#', ''), 16);
    } else if (Array.isArray(color)) {
      color = (color[0] << 16) + (color[1] << 8) + color[2];
    }
  
    if (color < 0 || color > 0xffffff) throw new Error('COLOR_RANGE');
    else if (color && isNaN(color)) throw new Error('COLOR_CONVERT');
  
    return color;
  }
  
}

module.exports = Util;