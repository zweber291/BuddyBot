const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const { token } = require('./config.json');
const { Player } = require('discord-player');

const client = new Client({ intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildVoiceStates, 
		GatewayIntentBits.GuildMembers, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences
	] 
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

client.player = new Player(client, {
	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1 << 25
	}
});

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
	console.log('BuddyBot is ready!');
	client.user.setPresence({
		activities: [{name: 'this server', type: ActivityType.Watching}],
		status: 'online'
	});
});

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()) {
		const command = client.commands.get(interaction.commandName);
		if (!command) return;
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command! Contact Smack and tell him what command errored.', ephemeral: true });
		}
	}
});

client.login(token);