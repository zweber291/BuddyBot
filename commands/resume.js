const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resumes playback of the current song in the queue. (DJ role only)'),
    async execute(interaction) {
        if (interaction.member.roles.cache.has('1065762276310781982')) {
            const queue = interaction.client.player.getQueue(interaction.guildId);
            if (!queue) return await interaction.reply({content: 'There aren\'t any songs in the queue!', ephemeral: true});
            queue.setPaused(false);
            await interaction.reply({content: 'Resuming playback. Type /pause to pause the song!', ephemeral: true});
        }
        else {
            interaction.reply({content: 'You need the DJ role to use this command!', ephemeral: true});
        }
    }
}