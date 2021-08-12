const { Client, Collection } = require('discord.js');
const client = new Client();
const { readdirSync } = require('fs');
const { Player } = require('discord-player');
const player = new Player(client, {
    ytdlDownloadOptions: { filter: "audioonly" },
});

client.player = player;
client.on("ready", () => {
    console.log(`${client.user.username} đã hoạt động!`)
    client.user.setPresence({
        activity: {
            name: "đang nghịch bot!",
            type: 'PLAYING'
        },
        status: 'dnd'
    })
});

client.player.on('trackStart', (message, track) => message.channel.send(`🎶 Đang Chơi Bài \`${track.title}\`...`));
client.player.on('trackAdd', (message, queue, track) => message.channel.send(`✔ Đã Thêm \`${track.title}\` Vào Danh Sách Chờ!`));
client.player.on('playlistAdd', (message, queue, playlist) => message.channel.send(`📃 Đã Thêm \`${playlist.track.length}\` Bài Hát Vào Danh Sách Chờ`));
client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync('./commands/');

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("message", message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    const prefix = ','
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        if (command.category === 'music' && !message.member.voice.channel) return message.channel.send('Vui Lòng Vô ROOM VOICE để sử dụng lệnh này!');
        command.run(client, message, args);
    }
})

client.login(process.env.token)