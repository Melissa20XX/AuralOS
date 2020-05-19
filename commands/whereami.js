module.exports = {
	name: 'whereami',
	description: 'Displays server name',
	cooldown: 10,
	usage: `<role>,<user(optional)>`,
	execute(message, args){
		message.channel.send(`You are in ${message.guild.name}\nPopulation: ${message.guild.memberCount}`);
	},
};