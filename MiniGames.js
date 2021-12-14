const commandHandler = require('./commands');
const config = require("./settings.json");
const {Client, Intents} = require("discord.js");


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
module.exports = {client};
client.login(config.Token);
client.on("ready", readyDiscord);

function readyDiscord(){
    console.log("Bot is ready");
}

client.on("messageCreate", commandHandler);
