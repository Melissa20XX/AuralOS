module.exports = {
	name: 'whoami',
	description: 'Displays username',
	execute(message, args){
		message.channel.send(`You are ${message.author.username}`);
	},
};