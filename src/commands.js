const fetch = require("node-fetch")
const client = require("./MyBot")
const HangmanGame = require('./Hangman');
const randomGod = require("./randomGods")
const playMusic = require("./playMusic")

module.exports = async function (msg){
    let tokens = msg.content.split(" ");
    if (!tokens[0].startsWith("!")){
        return;
    }

    // Hangman Command
    if(tokens[0] === "!hangman"){
        //Hangman Handler
        console.log(`${msg.member.user.tag} is playing hangman`)
        HangmanGame(msg);
    }

    // Random Smite God
    if(tokens[0].startsWith("!r")){
        let amount = 1;
        try{
            amount = tokens.length > 1 ? parseInt(tokens[1]) : 1;
        }
        catch(error){
            amount = 1;
            console.log(error);
        }
        console.log(`${msg.member.user.tag} is rolling ${amount} god(s)`);
        randomGod(amount);
    }

    // Music bot
    if(tokens[0].startsWith("!play")){
            playMusic(msg);
    }
    return;
}