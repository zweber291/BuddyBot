const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the currently playing song. (DJ role only)'),
    async execute(interaction) {
        if (interaction.user.roles.cache.has('1065762276310781982')) {
            const queue = interaction.client.player.getQueue(interaction.guildId);
            if (!queue) return await interaction.reply({content: 'There aren\'t any songs in the queue!', ephemeral: true});
            queue.setPaused(true);
            await interaction.reply({content: 'The current song has been paused. Type /resume to resume playback!', ephemeral: true});
        }
        else {
            interaction.reply({content: 'You need the DJ role to use this command!', ephemeral: true});
        }        
    }
}