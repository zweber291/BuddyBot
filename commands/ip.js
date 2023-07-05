const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ip')
        .setDescription('Display our Minecraft servers IP.'),
    async execute(interaction) {
        await interaction.reply('Java address: `survival.buddiesfun.xyz`\nBedrock address: `bedrock.buddiesfun.xyz`');
    }
}