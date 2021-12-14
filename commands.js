const fetch = require("node-fetch")

module.exports = async function (msg){
    let tokens = msg.content.split(" ");
    msg.channel.send(tokens[0]);
    return;
}