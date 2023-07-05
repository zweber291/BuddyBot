const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the current song and clears the queue if there is one. (DJ role only)'),
    async execute(interaction) {
        if (interaction.member.roles.cache.has('1065762276310781982')) {
            const queue = interaction.client.player.getQueue(interaction.guildId);
            if (!queue) return await interaction.reply({content: 'There aren\'t any songs in the queue!', ephemeral: true});
            queue.destroy();
            await interaction.reply({content: 'Stopping song and clearing queue.', ephemeral: true});
        }
        else {
            interaction.reply({content: 'You need the DJ role to use this command!', ephemeral: true});
        }
    }
}