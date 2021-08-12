const checkSameRoom = (message) => {
    if (!message.member.voice.channel) return message.reply('Bạn phải vào room voice để sử dụng lệnh này!');
    if (!message.guild.me.voice.channelID || message.guild.me.voice.channelID == message.member.voice.channelID) return;
    return message.reply('Bạn phải vào chung phòng với bot để sử dụng lệnh này!');
}

const { MessageEmbed } = require('discord.js');
const noMusicEmbed = () => new MessageEmbed().setColor('RED').setDescription('🛑 | Bạn đang không chơi nhạc!');

module.exports = {
    checkSameRoom,
    noMusicEmbed,
}