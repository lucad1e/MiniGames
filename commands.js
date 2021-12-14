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
        HangmanGame(msg);
    }
    return;
}