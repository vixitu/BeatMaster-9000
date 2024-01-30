const { lyricsExtractor } = require('@discord-player/extractor')
const { EmbedBuilder } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("lyrics").setDescription("Displays the lyrics of the currently playing song"),
	run: async ({ client, interaction }) => {
        const queue = client.player.nodes.get(interaction.guildId)
        let titleLyricTitle = queue.currentTrack.title
        let titleLyric = `${queue.currentTrack.author} ${queue.currentTrack.title}`
        const lyricsFinder = lyricsExtractor('AcaxwTyttPM7uPwlgFwji7cJ0sl2Iv-zDUYrCG6mA1QCxt4pvH90nggyZCNb04y7');
        const lyrics = await lyricsFinder.search(titleLyric).catch(() => null);
        if(!lyrics){
            console.log("couldnt find with artist + song name")
            const lyricsTitle = await lyricsFinder.search(titleLyricTitle).catch(() => null);
            if(!lyricsTitle){
                console.log("couldnt find with song name")
                return await interaction.editReply({ content: 'No lyrics found', ephemeral: true });
            } else{
                const trimmedLyrics = lyricsTitle.lyrics.substring(0, 1997);
        
                const embed = new EmbedBuilder()
                    .setTitle(lyricsTitle.title)
                    .setURL(lyricsTitle.url)
                    .setThumbnail(lyricsTitle.thumbnail)
                    .setAuthor({
                        name: lyricsTitle.artist.name,
                        iconURL: lyricsTitle.artist.image,
                        url: lyricsTitle.artist.url
                    })
                    .setDescription(trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics)
                    .setColor('Yellow');
            
                return interaction.editReply({ embeds: [embed] });
            }
        } else {
            const trimmedLyrics = lyrics.lyrics.substring(0, 1997);
        
            const embed = new EmbedBuilder()
                .setTitle(lyrics.title)
                .setURL(lyrics.url)
                .setThumbnail(lyrics.thumbnail)
                .setAuthor({
                    name: lyrics.artist.name,
                    iconURL: lyrics.artist.image,
                    url: lyrics.artist.url
                })
                .setDescription(trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics)
                .setColor('Yellow');
            
            return interaction.editReply({ embeds: [embed] });
        } 
        
        
        
    },
}