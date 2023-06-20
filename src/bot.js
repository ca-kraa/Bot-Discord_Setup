require("dotenv").config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandsArray = [];

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

// Mengganti 'handleEvents' dan 'handleCommands' dengan nama fungsi yang sesuai
const handlerEvents = require("./functions/handlers/handlerEvents");
const handlerCommands = require("./functions/handlers/handlerCommands");

handlerEvents(client);
handlerCommands(client);

client.login(token);
