const { MessageEmbed } = require('discord.js');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function capitalize(string) {
    let capital_str = ''
    arr = string.split(' ');
    arr.forEach(element => {
        capital_str += element.charAt(0).toUpperCase() + element.slice(1) + ' ';
    });
    console.log(capital_str)
    return capital_str;
  }

exports.closedvote = function (channel, botid) {
// Closed Votation, Repetition is not Allowed

    const voteEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Votação Encerrada')
    .setDescription('Os jogos escolhidos foram:')

    const votes = []
    const collector = channel.createMessageCollector();                             // Message Collector
    console.log("Votação Fechada");
    collector.on('collect', async m => {            // On message collected
            if(m.author.id == botid){                                       // If is bot message
                return;
            }
            else if (m.content.toLowerCase() === 'votar'){                  // Finish the collector
                collector.stop()
            }
            else{        
                msg = m.content.toLowerCase()
                
                if(votes.find(v => v == msg) == undefined){
                    m.react('👍');                                         // Tests if game is already in the votation
                    votes.push(msg);
                    voteEmbed.addField(String(votes.length), capitalize(msg) );
                }
                else{
                    m.react('❌')                           // If already is, do not append to vote list
                    try {
                        await m.member.voice.setMute(true);
                    }
                    catch(e){
                        console.log('Member not connected')
                    }
                        
                }
                
            }
       }
    );
    collector.on('end', async collected => {         // When collector is finished
            const select = votes[Math.floor(Math.random() * votes.length)];         // Random Selection
            channel.send({ embeds: [voteEmbed] })                                   // Show Games
            console.log(votes)
            channel.send("Com os poderes a mim concedidos")
            await sleep(100);                                                       // Dramatic Pause
            channel.send("\nSeleciono:\n"+ capitalize(select));                     // Selects
        }
    );

}

exports.vote = function (channel, botid){
    const voteEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Votação Fechada Encerrada')
    .setDescription('Os jogos escolhidos foram:')


    const votes = []
    const collector = channel.createMessageCollector();
    console.log("Votação Aberta");
    collector.on('collect', m => {
                    if(m.author.id == botid){
                        return;
                    }
                    else if (m.content.toLowerCase() === 'votar'){
                        collector.stop()
                    }
                    else{
                        msg = m.content.toLowerCase()

                        m.react('👍');
                        votes.push(msg);
                        voteEmbed.addField(String(votes.length), capitalize(m.content));
                    }
                }
                );
    collector.on('end', async collected => {
                    const select = votes[Math.floor(Math.random() * votes.length)];         // Random Selection
                    channel.send({ embeds: [voteEmbed] })                                   // Show Games
                    channel.send("Com os poderes a mim concedidos")
                    await sleep(100);                                                       // Dramatic Pause
                    channel.send("\nSeleciono:\n" + capitalize(select));                     // Selects
                }
                );



}
