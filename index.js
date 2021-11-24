const eris = require('eris');

// Client Instance with Bot Token
const bot = new eris.Client('OTEzMTY5NjcyNzc2NTg1MjI3.YZ6lhw.FespxxxwWLfDWKxG14ujUQ-3gKI');

// Prefix to call the Bot
const PREFIX = '!bt';
const cmds = ['v','vote'];

// When the bot is connected and ready, log to console.
bot.on('ready', () => {
   console.log('Bot is Online');
});


bot.on('messageCreate', async (msg) => {
    const botWasMentioned = msg.mentions.find(
        mentionedUser => mentionedUser.id === bot.user.id,
    );
    // Search in messages if bot was Mentioned "@Bootstrap"

    if (botWasMentioned) {
        try {
            await msg.channel.createMessage('FALA MEU CONSAGRADO\nO prefixo do Bot é !bt');
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
  const cmd = args.splice(0,2)[1];

  // Test if Command is Valid
  if (cmds.indexOf(cmd) < 0) {
      return;
  }

  try {
      // TODO Execute Command
      //
  } catch (err) {
      console.warn('Error handling command');
      console.warn(err);
  }
});

bot.on('error', err => {
   console.warn(err);
});

bot.connect();
