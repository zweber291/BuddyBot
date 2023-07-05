const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dadjoke')
        .setDescription('Display a random dad joke.'),
    async execute(interaction) {
        const jokeResult = await (await request('https://icanhazdadjoke.com/', {headers:['Accept', 'application/json']})).body.json();
        const jsonObj = JSON.stringify(jokeResult);
        const joke = JSON.parse(jsonObj);
        interaction.reply(joke.joke);
    }
}
