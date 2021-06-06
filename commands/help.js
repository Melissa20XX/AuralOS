const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'Lists all commands, or gives information on a specific command',
	cooldown: 5,
	usage: '<command name>',
	
	execute(message, args){
		const data = []
		const { commands } = message.client

		//data.push is used to append shit to the message that is sent at command end

		//If the arguments list is empty, just list all the commands
		if(!args.length) 
		{
			data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			//DM pushed data to author of original message
			return message.author.send(data, { split: true })
			
			.then( () => {
			//bot doesnt say this if command was sent via dm
			if (message.channel.type === 'dm') return;
			message.reply('I\'ve sent you a DM with all my commands!');
			})
			
			.catch(error => {
			console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
			message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
			});
		}

		//var name is the 1st argument and is the name of the desired command
		const name = args[0].toLowerCase();
		//var name is then used to attach a relevant file to var command
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		//if no valid command file was found then u done goofed & we return
		if (!command) {
			return message.reply('lol i cant give info about an invalid command');
		}

		//if we made it this far, they want command metadata, and no data has been pushed yet
		data.push(`**Name:** ${command.name}`);

		//only display metadata that exists
		if (command.aliases)
			{ data.push(`**Aliases:** ${command.aliases.join(', ')}`); }
		if (command.description)
			{ data.push(`**Description:** ${command.description}`); }
		if (command.usage)
			{ data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`); }

		//every command has a cooldown, undefined = 3 seconds
		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
	
	},
};