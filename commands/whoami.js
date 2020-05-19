module.exports = {
	name: 'whoami',
	description: 'Displays username',
	cooldown: 10,
	usage: `no arguments needed`,
	execute(message, args){
		message.channel.send(`You are ${message.author.username}`);
	},
};