const commandHandler = require('./commands');
require('dotenv').config()

const {Client, Intents, VoiceChannel} = require("discord.js");
const { joinVoiceChannel, entersState  } = require('@discordjs/voice');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
module.exports = {client};
client.login(process.env.Token);
client.on("ready", readyDiscord);

function readyDiscord(){
    console.log(`Logged in as ${client.user.tag}!`);
}

client.on("messageCreate", test);

function test(msg){
    if(!msg.content.startsWith("1")){
        return
    }
    console.log(msg.member.voice.channel)
    let voiceChannel  = msg.member.voice.channel;

    if (!voiceChannel){return msg.reply(' Please join a voice channel first!');}

    connect(voiceChannel)
}

async function connect(channel){
    const connection = joinVoiceChannel({
		channelId: channel.id,
		guildId: channel.guild.id,
		adapterCreator: channel.guild.voiceAdapterCreator,
	});

	try {
		await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
		return connection;
	} catch (error) {
		connection.destroy();
		throw error;
	}
}