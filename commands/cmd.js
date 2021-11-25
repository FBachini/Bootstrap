var Main = require('../index.js');

exports.handler = async function(cmd, args, msg) {
    channel = msg.channel           // Channel where the bot was called

    switch (cmd) {
        case 'v':
        case 'vote':                                // Start Vote
            channel.send("Começando a Votação")
            break;

        case 'closedvote':                          // Start Closed Vote
        case 'cv':

            return;

        case 'prefix':
        case 'p':                                  // Change Prefix

            if(args.length > 1 || args[0].length > 2){
                channel.send("Pera lá amigão, comando simples né\nTome um tempo para pensar em seus atos")
                msg.member.voice.setChannel(null);  // Kick user from voice to think of his actions
                return;
            }

            Main.set_prefix(args[0])            // Simple Prefixes are allowed
            channel.send("Prefixo atualizado")
            return;

        default:
            return

    }
}
