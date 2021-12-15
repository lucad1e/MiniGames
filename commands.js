const fetch = require("node-fetch")
const HangmanGame = require('./Hangman');
const client = require("./MiniGames")

module.exports = async function (msg){
    let tokens = msg.content.split(" ");
    if (!tokens[0].startsWith("!")){
        return;
    }
    if(tokens[0] === "!hangman"){
        //Hangman Handler
        console.log(`${msg.member.user.tag} is playing hangman`)
        HangmanGame(msg);
    }
    return;
}