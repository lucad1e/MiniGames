const commandHandler = require('./commands');
const config = require("./settings.json");
const Discord = require("discord.js");


const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
console.log(config.Token);
client.login(config.Token);
client.on("ready", readyDiscord);

function readyDiscord(){
    console.log("Bot is ready");
}

client.on("message", commandHandler);