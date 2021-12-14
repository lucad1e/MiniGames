const client = require("./MiniGames")
const Discord = require("discord.js");
const emojiList = require("./emojis.json")

module.exports = async function(msg){
    game = new HangmanGame();
    game.startGame(msg);
    return;
}

class HangmanGame{
    constructor(){
        this.gameEmbed = null;
        this.word = "";
        this.guessed = "";
        this.guessesRemaining = 4;
        this.inGame = false;
    }

    startGame(msg){
        if (this.inGame){
            return;
        }
        this.inGame = true;
        this.word = "dog";
        const embed = new Discord.MessageEmbed()
            .setColor('#2ECC71')
            .setTitle('Hangman')
            .setDescription(this.getDescription())
            .addField('Letters Guessed: ', 'A');
    
        

        msg.channel.send({embeds: [embed]});
        /*msg.channel.send({embeds: [embed]}).then(embSent =>{
            this.gameEmbed = emsg;
            this.waitForLetter()
        });*/
        return;
    }
    
    getDescription(){
        return  "```|‾‾‾‾‾| " +  
            "\n|    " + (this.guessesRemaining < 4 ? "🎩" : " ") + 
            "\n|    " + (this.guessesRemaining < 3 ? "😂" : " ") +
            "\n|    " + (this.guessesRemaining < 2 ? "👕" : " ") +
            "\n|    " + (this.guessesRemaining < 1 ? "👟" : " ") +
            "\n|" + "\n|______" + "```"
    }




}