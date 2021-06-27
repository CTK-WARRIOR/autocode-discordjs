const { FLAGS } = require("../util/Constants")

class Tools {
  static getUserBadges(flag) {
    return Object.entries(FLAGS).reduce((badges, [key, bit]) => (flag & bit) > 0 ? [...badges, key] : badges, [])
  }
}

module.exports = Tools;