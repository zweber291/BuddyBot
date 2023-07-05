const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the currently playing song if there is one. (DJ role only)'),
    async execute(interaction) {
        if (interaction.member.roles.cache.has('1065762276310781982')) {
            const queue = interaction.client.player.getQueue(interaction.guildId);
            if (!queue) return await interaction.reply({content: 'There aren\'t any songs in the queue!', ephemeral: true});
            const currentSong = queue.current;
            queue.skip();
            let embed = new EmbedBuilder().setColor(0x68eae3);
            embed.setDescription(`${currentSong.title} has been skipped!`)
                 .setThumbnail(currentSong.thumbnail);
            await interaction.reply({
                embeds: [embed]
            });
        }
        else {
            interaction.reply({content: 'You need the DJ role to use this command!', ephemeral: true});
        }
    }
}