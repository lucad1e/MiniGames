const client = require("./MiniGames")
const Discord = require("discord.js");
const emojiList = require("./emojis.json")

module.exports = async function(msg){
    const guessedLetters = "";
    const guessesRemaining = 6;
    msg.channel.send("Your filthy mother").then(sentMsg => {
        // sentMsg.react(emojiList.letters.a)
        console.log(emojiList.letters.a)
        for (let letter of Object.keys(emojiList.letters)){
            // console.log(emojiList[letter])
            sentMsg.react(emojiList.letters[letter])
        }
    }); 
    //msg.react("")
    return;
}