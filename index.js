const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Sensitive Data
const { clientId, guildId, token } = require('./config.json');


// Prefix to call the Bot
var PREFIX = '!';

// Valid Commands
const cmds = ['v','vote','p', 'prefix','closedvote', 'cv'];
const Commands = require('./commands/cmd.js');

// When the bot is connected to Discord, log to console.
client.on('ready', () => {
  console.log("Bot is Online");
});


client.on('messageCreate', async msg => {

    const botWasMentioned = msg.mentions.users.find(
        mentionedUser => mentionedUser.id === client.user.id,
    );

    // Search in messages if bot was Mentioned "@Bootstrap"
    if (botWasMentioned) {
        try {
            await msg.reply('Bootstrap chegando pra votar o próprio nome\nOu não\nO prefixo é ' + PREFIX);
        } catch (err) {
            console.warn('Error on Mention Response');
            console.warn(err);
        }
    }

    const content = msg.content;

    // If not mentioned and message do not have bot prefix -> pass
    if (!content.startsWith(PREFIX)) {
      return;
    }

    // Split Message in Commands and args
    const args = content.split(' ');

    // Remove Prefix
    const cmd = args.splice(0,1)[0].replace(PREFIX, '').toLowerCase();

    // Test if Command is Valid
    if (cmds.indexOf(cmd) < 0) {
      return;
    }

    try {
      // Send commands to function handler
      Commands.handler(cmd, args, msg)

    } catch (err) {
      console.warn('Error handling command');
      console.warn(err);
    }
});


client.login(token);

exports.set_prefix = function (new_prefix) {
    PREFIX = new_prefix
}
