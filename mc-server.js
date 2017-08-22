const Discord = require('discord.js');
const request = require('request');
const client = new Discord.Client();
const config = require('./config.json')

var prefix = "pug:";
var ver = "1.0.8";
var mcIP = '158.69.18.113';
var mcPort = 25565;
var suggestStates = {};

client.on("ready", () => {
	client.user.setPresence({ game: { name: 'For help: pug:help', type: 0 } });
});

client.on("guildMemberAdd", function(member) {
	member.guild.channels.find("name", "welcome-and-bye").sendMessage(member.toString() + ", Welcome to the PugCraft Server! Have a great time here :wink:");
});

client.on("guildMemberRemove", function(member) {
	member.guild.channels.find("name", "welcome-and-bye").sendMessage(`It was nice knowing you **${member.user.username}**, Goodbye **${member.user.username}**.`);
});


client.on('message', message => {
   if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

	if(command === 'help'){
		 var embed = new Discord.RichEmbed()
			.addField('Commands for PugCraft Bot!\n\n',
			'**'+prefix+'profile** Shows your profile pic in a image\n' +
			"**"+prefix+"ping** Type this command and you'll see ;)\n" +
			'**'+prefix+'about** Shows who made this bot\n' +
			'**'+prefix+'status** It tells the status of the PugCraft server!\n' +
			"**"+prefix+"ask** Go ask PugCraft Bot a question let's see what he's response!\n\n" +
			"**The version that PugCraft Bot's running is " + ver + "!**", true)
			.setColor("#fa00ff")
			message.channel.sendEmbed(embed);
    }

    if(command === 'profile'){
        message.reply(message.author.avatarURL);
    }

    if(command === 'ping'){
        message.reply('Pong! :ping_pong:');
    }

    if(command === 'about'){
		message.channel.send ('The person who made this is Alee14#9928! And it was based of the code AleeBot.');
    }

   if (command === 'status') {
        var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
        request(url, function(err, response, body) {
            if(err) {
                console.log(err);
                return message.reply('Error getting Minecraft server status...');
            }
            body = JSON.parse(body);
            var status = '*PugCraft server is currently offline*';
            if(body.online) {
                status = '**PugCraft** server is **online**  -  ';
                if(body.players.now) {
                    status += '**' + body.players.now + '** people are playing!';
                } else {
                    status += '*Nobody is playing!*';
                }
            }
            message.reply(status);
       });
    }

	  if(command === 'ask'){
        var abaskanswer = [
          "Yes.",
          "No.",
          "Maybe.",
          "I don't know?",
          "Hmm let me think :thinking:"
        ];
        if (args[1]) {
           message.channel.sendMessage(abaskanswer[Math.floor(Math.random() * abaskanswer.length)]);
        } else {
          message.channel.sendMessage("Sorry, I don't know what your saying.")
        }

      }

	  if(command === 'say'){
	  if(message.author.id !== "242775871059001344") return;
      message.channel.sendMessage(args.join(" "));
      message.delete();

    }

  });


 process.on('unhandledRejection', function(err, p) {
    console.log("[ERROR | UNCAUGHT PROMISE] " + err.stack);
});
 console.log("[SUCCESS] PugCraft Bot is now ready! Running version "+ ver +"!");

 client.login(config.token)
