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
        .setTitle('Votação Fechada')
        .setDescription('Os jogos escolhidos foram:')

    const votes = []
    const collector = channel.createMessageCollector();                     // Message Collector
    console.log("Votação Fechada");
    collector.on('collect', async m => {                                    // On message collected
            msg = m.content.toLowerCase()
            if(m.author.id == botid){                                       // If is bot message
                return;
            }
            else if (msg.startsWith('cv')){                                 // Finish the collector
                choose = msg.replace("cv ", "")
                
                if(choose == 'votar'){
                    collector.stop()
                    return
                }                   
                
                if(votes.find(v => v == choose) == undefined){
                    m.react('👍');                                          // Tests if game is already in the votation
                    votes.push(choose);
                    voteEmbed.addField(String(votes.length), capitalize(choose));
                    channel.send({ embeds: [voteEmbed] })  

                }
                else{
                    m.react('❌')                                           // If already is, do not append to vote list
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
    collector.on('end', async collected => {                                        // When collector is finished
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
// Open Votation
    const voteEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Votação Aberta')
    .setDescription('Os jogos escolhidos foram:')


    const votes = []
    const collector = channel.createMessageCollector();
    console.log("Votação Aberta");
    collector.on('collect', m => {
        msg = m.content.toLowerCase()
        if(m.author.id == botid){                                       // If is bot message
            return;
        }             
        else if (msg.startsWith('v')){
            choose = msg.replace("v ", "")
                
            if(choose == 'votar'){
                collector.stop()
                return
            }             

            m.react('👍');
            votes.push(msg);
            voteEmbed.addField(String(votes.length), capitalize(m.content));
            channel.send({ embeds: [voteEmbed] }) 
        }
    }
    );
    collector.on('end', async collected => {
                    const select = votes[Math.floor(Math.random() * votes.length)];         // Random Selection
                    channel.send({ embeds: [voteEmbed] })                                   // Show Games
                    channel.send("Com os poderes a mim concedidos")
                    await sleep(100);                                                       // Dramatic Pause
                    channel.send("\nSeleciono:\n" + capitalize(select));                    // Selects
                }
                );

}
