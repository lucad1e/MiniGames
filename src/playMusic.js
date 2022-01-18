
module.exports = async function(msg){
    // do shit here
    video = new Video();
    video.start(msg);
    return
}

class Video{
    constructor(){
        this.voiceChannel = null
    }
    
    start(msg){
        this.voiceChannel = msg.member.voice.channel
        if(this.voiceChannel === null){
            console.log("not in channel")
            return msg.reply("Please join a voice channel first")
        }
        console.log("In channel")
    }
}