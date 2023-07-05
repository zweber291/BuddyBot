const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('doggo')
        .setDescription('Display a random picture of a dog.'),
    async execute(interaction) {
        const dogResult = await (await request('https://random.dog/woof.json')).body.json();
        const jsonObj = JSON.stringify(dogResult);
        const dogImg = JSON.parse(jsonObj);
        interaction.reply({ files: [dogImg.url] });
    }
}
