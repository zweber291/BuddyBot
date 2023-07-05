const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catfact')
        .setDescription('Display a random cat fact.'),
    async execute(interaction) {
        const factResult = await (await request('https://catfact.ninja/fact')).body.json();
        const jsonObj = JSON.stringify(factResult);
        const catFact = JSON.parse(jsonObj);
        interaction.reply(catFact.fact);
    }
}
