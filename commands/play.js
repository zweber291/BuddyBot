const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Loads songs from youtube. (DJ role only)")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("song")
				.setDescription("Loads a single song from a url. (DJ role only)")
				.addStringOption((option) => option.setName("url").setDescription("the song's url").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("playlist")
				.setDescription("Loads a playlist of songs from a url. (DJ role only)")
				.addStringOption((option) => option.setName("url").setDescription("the playlist's url").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("search")
				.setDescription("Searches for sogn based on provided keywords. (DJ role only)")
				.addStringOption((option) =>
					option.setName("searchterms").setDescription("the search keywords").setRequired(true)
				)
		),
        async execute(interaction) {
            if (interaction.member.roles.cache.has('1065762276310781982')) {
                if (!interaction.member.voice.channel) return interaction.reply("You need to be in a voice channel to use this command!")

                const queue = await interaction.client.player.createQueue(interaction.guild)
                if (!queue.connection) await queue.connect(interaction.member.voice.channel)
        
                let embed = new EmbedBuilder().setColor(0x68eae3)
        
                if (interaction.options.getSubcommand() === "song") {
                    let url = interaction.options.getString("url")
                    const result = await interaction.client.player.search(url, {
                        requestedBy: interaction.user,
                        searchEngine: QueryType.YOUTUBE_VIDEO
                    })
                    if (result.tracks.length === 0)
                        return interaction.reply("No results.")
                    
                    const song = result.tracks[0]
                    await queue.addTrack(song)
                    embed
                        .setDescription(`**[${song.title}](${song.url})** has been added to the Queue.`)
                        .setThumbnail(song.thumbnail)
                        .setFooter({ text: `Duration: ${song.duration}`})
        
                } else if (interaction.options.getSubcommand() === "playlist") {
                    let url = interaction.options.getString("url")
                    const result = await interaction.client.player.search(url, {
                        requestedBy: interaction.user,
                        searchEngine: QueryType.YOUTUBE_PLAYLIST
                    })
        
                    if (result.tracks.length === 0)
                        return interaction.editreply("No results")
                    
                    const playlist = result.playlist
                    await queue.addTracks(result.tracks)
                    embed
                        .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue.`)
                        .setThumbnail(playlist.thumbnail)
                } else if (interaction.options.getSubcommand() === "search") {
                    let url = interaction.options.getString("searchterms")
                    const result = await interaction.client.player.search(url, {
                        requestedBy: interaction.user,
                        searchEngine: QueryType.AUTO
                    })
        
                    if (result.tracks.length === 0)
                        return interaction.editreply("No results")
                    
                    const song = result.tracks[0]
                    await queue.addTrack(song)
                    embed
                        .setDescription(`**[${song.title}](${song.url})** has been added to the Queue.`)
                        .setThumbnail(song.thumbnail)
                        .setFooter({ text: `Duration: ${song.duration}`})
                }
                if (!queue.playing){
                    await queue.play()
                } 
                await interaction.reply({
                    embeds: [embed]
                })
            }
            else {
                interaction.reply({content: 'You need the DJ role to use this command!', ephemeral: true});
            }
        }
}