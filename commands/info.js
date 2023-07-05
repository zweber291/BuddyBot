const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Display info on the currently playing song if there is one.'),
    async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue) return await interaction.reply({content: 'There aren\'t any songs in the queue!', ephemeral: true});
        let bar = queue.createProgressBar({
            queue: false,
            length: 19
        });
        const song = queue.current;
        let embed = new EmbedBuilder().setColor(0x68eae3);
        embed.setThumbnail(song.thumbnail)
             .setDescription(`Currently Playing [${song.title}](${song.url})\n\n` + bar);
        await interaction.reply({
            embeds: [embed]
        });
    }
}