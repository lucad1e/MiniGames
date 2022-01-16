const commandHandler = require('./commands');
require('dotenv').config()

const {Client, Intents} = require("discord.js");


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
module.exports = {client};
client.login(process.env.Token);
client.on("ready", readyDiscord);

function readyDiscord(){
    console.log(`Logged in as ${client.user.tag}!`);
}

client.on("messageCreate", commandHandler);
