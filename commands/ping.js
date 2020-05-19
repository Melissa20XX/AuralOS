module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 10,
	usage: `no arguments needed`,
	execute(message, args){
		message.channel.send('Pong');
	},
};