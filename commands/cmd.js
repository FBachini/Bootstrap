var Main = require('../index.js');
var Voter = require('./voter.js');
const { MessageEmbed } = require('discord.js');

const helpEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Comandos')
    .setDescription('Os Comandos que este bot oferece são:')
    .addFields(
        { name: "vote  (v)", value: "Votação Aberta (Permite Repetição)"},
        { name: "closedVote  (cv)", value: "Votação Aberta (Permite Repetição)"},
        { name: "disconnect  (d) \"name\"", value: "Desconecta a pessoa desejada"},
    )

exports.handler = async function(cmd, args, msg) {
    channel = msg.channel           // Channel where the bot was called

    switch (cmd) {
        case 'v':
        case 'vote':                                // Start Vote
            channel.send("Começando a Votação")
            Voter.vote()
            break;

        case 'closedvote':                          // Start Closed Vote
        case 'cv':
            channel.send("Começando a Votação Fechada")
            Voter.closedvote()
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

        case 'help':
            channel.send({ embeds: [helpEmbed] })

        case 'disconnect':
        case 'd':
            name = args()
            channel.send("https://tenor.com/view/gotta-go-gtg-peace-out-gif-11015153")
            msg.member.voice.setChannel(null);

        default:
            return

    }
}
