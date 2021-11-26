
exports.closedvote = function (channel, botid) {
    const votes = []
    const collector = channel.createMessageCollector();
    console.log("Votação Fechada");
    collector.on('collect', m => {
                    if(m.author.id == botid){
                        return;
                    }
                    else if (m.content.toLowerCase() === 'votar'){
                        collector.stop()
                    }
                    else{
                        m.react('👍');
                        votes.push(m.content);
                    }
                }
                );
    collector.on('end', collected => {
                    channel.send(`Votação Encerrada\nJogos Selecionados:\n${votes.join('\n')}`);
                    console.log(votes)
                }
                );

}

exports.vote = function (channel, botid){
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
                        m.react('👍');
                        votes.push(m.content);
                    }
                }
                );
    collector.on('end', collected => {
                    channel.send(`Votação Encerrada\nJogos Selecionados:\n${votes.join('\n')}`);
                    const select = votes[Math.floor(Math.random() * votes.length)];
                    channel.send("Com os poderes a mim concedidos")
                    channel.send(`\nSeleciono:\n${select}`);
                }
                );



}
