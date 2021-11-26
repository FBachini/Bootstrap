const Main = require('../index.js');
const Voter = require('./voter.js');
const Utils = require('./utils.js')
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

exports.handler = async function(cmd, args, msg, botid) {
    channel = msg.channel           // Channel where the bot was called

    switch (cmd) {
        case 'v':
        case 'vote':                                // Start Vote
            channel.send("Começando a Votação Aberta")
            Voter.vote(msg.channel, botid)
            break;

        case 'closedvote':                          // Start Closed Vote
        case 'cv':
            channel.send("Começando a Votação Fechada")
            Voter.closedvote(msg.channel, botid)
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
            return;

        case 'disconnect':
        case 'd':
            member = Utils.getUserFromMention(args[0], msg)


            if(msg.author.username == 'Victão'){
                channel.send("https://tenor.com/view/bye-slide-baby-later-peace-out-gif-12999722")
                msg.member.voice.setChannel(null);
            }
            else{
                try {
                    channel.send("https://tenor.com/view/gotta-go-gtg-peace-out-gif-11015153")
                    member.voice.setChannel(null);
                } catch (e) {
                    console.log("Member Undefined")
                }
            }

        default:
            return

    }
}
