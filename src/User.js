const lib = require('lib')({ token: process.env.STDLIB_SECRET_TOKEN });

const Tools = require('./Tools');

class User {
    constructor(data) {
        /**
         * The user's id
         * @type {Snowflake}
         */
        this.id = data.id;

        this.bot = null;

        this.system = null;

        this.flags = null;

        if ('username' in data) {
            /**
             * The username of the user
             * @type {?string}
             */
            this.username = data.username;
        } else {
            this.username ??= null;
        }

        if ('bot' in data) {
            /**
             * Whether or not the user is a bot
             * @type {?boolean}
             */
            this.bot = Boolean(data.bot);
        } else if (!this.partial && typeof this.bot !== 'boolean') {
            this.bot = false;
        }

        if ('discriminator' in data) {
            /**
             * A discriminator based on username for the user
             * @type {?string}
             */
            this.discriminator = data.discriminator;
        } else {
            this.discriminator ??= null;
        }

        if ('avatar' in data) {
            /**
             * The user avatar's hash
             * @type {?string}
             */
            this.avatar = data.avatar;
        } else {
            this.avatar ??= null;
        }

        if ('banner' in data) {
            /**
             * The user banner's hash
             * <info>The user must be force fetched for this property to be present or be updated</info>
             * @type {?string}
             */
            this.banner = data.banner;
        } else if (this.banner !== null) {
            this.banner ??= undefined;
        }

        if ('accent_color' in data) {
            /**
             * The base 10 accent color of the user's banner
             * <info>The user must be force fetched for this property to be present or be updated</info>
             * @type {?number}
             */
            this.accentColor = data.accent_color;
        } else if (this.accentColor !== null) {
            this.accentColor ??= undefined;
        }

        if ('system' in data) {
            /**
             * Whether the user is an Official Discord System user (part of the urgent message system)
             * @type {?boolean}
             */
            this.system = Boolean(data.system);
        } else if (!this.partial && typeof this.system !== 'boolean') {
            this.system = false;
        }

        if ('public_flags' in data) {
            /**
             * The flags for this user
             * @type {?UserFlagsBitField}
             */
            this.flags = new Tools.getUserBadges(data.public_flags);
        }

        /**
         * Whether this User is a partial
         * @type {boolean}
         * @readonly
         */
        get partial() {
            return typeof this.username !== 'string';
        }

        /**
         * The timestamp the user was created at
         * @type {number}
         * @readonly
         */
        get createdTimestamp() {
            const DISCORD_EPOCH = 1420070400000;

            function convertSnowflakeToDate(snowflake) {
                return new Date(snowflake / 4194304 + DISCORD_EPOCH);
            }

            convertSnowflakeToDate(this.id)
        }

        /**
         * The time the user was created at
         * @type {Date}
         * @readonly
         */
        get createdAt() {
            return new Date(this.createdTimestamp);
        }

        /**
         * The hexadecimal version of the user accent color, with a leading hash
         * @type {?string}
         * @readonly
         */
        get hexAccentColor() {
            if (typeof this.accentColor !== 'number') return this.accentColor;
            return `#${this.accentColor.toString(16).padStart(6, '0')}`;
        }

        /**
         * The Discord "tag" (e.g. `CTK WARRIOR#7923`) for this user
         * @type {?string}
         * @readonly
         */
        get tag() {
            return typeof this.username === 'string' ? `${this.username}#${this.discriminator}` : null;
        }

        async fetch(user_id) {
            const id = user_id ? user_id : this.id;

            return await lib.discord.users['@0.2.1'].retrieve({
                user_id: id,
            });
        }
    }
}