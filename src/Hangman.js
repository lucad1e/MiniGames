const client = require("./MiniGames")
const Discord = require("discord.js");
const emojiList = require("../emojis.json")
const wordList = require("../words.json")

module.exports = async function(msg){
    game = new HangmanGame();
    game.startGame(msg);
    return;
}

class HangmanGame{
    constructor(){
        this.gameEmbed = null;
        this.word = "";
        this.guessed = [];
        this.guessedRight = [];
        this.guessesRemaining = 5;
        this.inGame = false;
        this.id = null;
    }

    startGame(msg){
        if (this.inGame){
            return;
        }
        this.id = msg.member.id
        this.inGame = true;
        this.word = this.getWord()
        const embed = new Discord.MessageEmbed()
            .setColor(this.getColour())
            .setTitle('Hangman')
            .setDescription(this.getDescription())
            .addField('Letters Guessed: ', '\u200b')
            .addField('How to Play:', 'React to this message with a letter to guess')
            .setTimestamp();
    
        
        // msg.channel.send({embeds: [embed]});
        msg.channel.send({embeds: [embed]}).then(embSent =>{
            this.gameEmbed = embSent;
            this.waitForLetter();
        });
        
        return;
    }
    
    waitForLetter(){
        const filter = (reaction, user) => user.id === this.id
        this.gameEmbed.awaitReactions({ filter, time: 30000 , max: 1})
            .then(collected => {
                const reaction = collected.first();
                const letter = emojiList.letters[reaction.emoji.name];
                this.updateEmbed(letter); 
             })
            .catch(() => {
                this.guessesRemaining = -1;
                const newEmb = new Discord.MessageEmbed()
                .setColor(this.getColour())
                .setTitle('Hangman')
                .setDescription(this.getDescription())
                .addField('Letters Guessed: ', this.guessedLetters())
                .addField('How to Play:', 'React to this message with a letter to guess')
                .setTimestamp(); 
                this.gameEmbed.edit({embeds: [newEmb]})
            });
    }

    updateEmbed(letter){
        this.gameEmbed.reactions.removeAll()
        if (this.guessed.includes(letter) || letter === undefined){
            this.waitForLetter();
            return;
        }
        if(this.word.includes(letter)){
            const am = this.multipleLetters(letter)
            for(let i = 0; i < am; i++){
                this.guessedRight = this.guessedRight.concat(letter);
            }
        }
        else{
            this.guessesRemaining -= 1
        }
        this.guessed = this.guessed.concat(letter);
        const newEmb = new Discord.MessageEmbed()
            .setColor(this.getColour())
            .setTitle('Hangman')
            .setDescription(this.getDescription())
            .addField('Letters Guessed: ', this.guessedLetters())
            .addField('How to Play:', 'React to this message with a letter to guess')
            .setTimestamp(); 
        this.gameEmbed.edit({embeds: [newEmb]}).then(embSent =>{
            this.gameEmbed = embSent;
            if(this.isGameOver()){
                return;
            }
            this.waitForLetter();
        })
    }

    getColour(){
        // No answer right
        const quo = this.guessedRight.length / this.word.length
        if(quo < 0.33 || this.guessesRemaining <= 0){
            return '#ED4245';
        }
        if(quo < 0.66){
            return '#E67E22';
        }
        if(quo < 1){
            return '#FEE75C';
        }
        return '#2ECC71'

    }
    
    getDescription(){
        return  "```|‾‾‾‾‾‾‾‾‾‾| " +  
            "\n|         " + (this.guessesRemaining < 5 ? "🎩" : " ") + 
            "\n|         " + (this.guessesRemaining < 4 ? "😳" : " ") +
            "\n|         " + (this.guessesRemaining < 3 ? "👕" : " ") +
            "\n|         " + (this.guessesRemaining < 2 ? "👖" : " ") +
            "\n|        " + (this.guessesRemaining < 1 ? "👟👟" : " ") +
            "\n|" +"\n|___________" + 
            "\n \n" + this.gameOverMessage() + "\n" +  this.guessedLettersRight() + "```"
    }

    gameOverMessage(){
        if(this.guessesRemaining < 0){
            this.guessedRight = Array.from(this.word);
            return "You took too long. The word was";
        }
        if(this.guessesRemaining === 0){
            this.guessedRight = Array.from(this.word);
            return "Better luck next time. The word was";
        }
        if(this.guessedRight.length === this.word.length){
            return "YOU WIN. Congratulations"
        }
        else{
            return "";
        }
    }

    guessedLettersRight(){
        var result = ""
        for (var i = 0; i < this.word.length; i++) {
            if (this.guessedRight.includes(this.word.charAt(i))){
                result += this.word.charAt(i) + " ";
            }
            else{
                result += "_ "
            }
          }
        return result;
    }

    guessedLetters(){
        var result = ""
        for(const l of this.guessed){
            result += l + " ";
        }
        return result.length == 0 ? '\u200b' : result;
    }

    isGameOver(){
        if(this.guessesRemaining === 0 || this.guessedRight.length === this.word.length){
            return true;
        }
    }

    getWord(){
        const arr = wordList.words;
        const i = Math.floor(Math.random() * arr.length);
        return arr[i].toUpperCase()
    }

    multipleLetters(letter){
        var amount = 0;
        for(let i = 0; i < this.word.length; i++){
            if(this.word.charAt(i) === letter){
                amount++;
            }
        }
        return amount;
    }
}