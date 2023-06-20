const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const fs = require("fs");

module.exports = async (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    const commands = [];

    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.push(command.data.toJSON());
      }
    }

    const clientId = "1113982709107282081";
    const guildId = "1089015833512136834"; // Optional, only if you want to register guild-specific commands
    const rest = new REST({ version: "9" }).setToken(process.env.token);

    try {
      console.log("Started refreshing application (/) commands.");
      await rest.put(
        guildId
          ? Routes.applicationGuildCommands(clientId, guildId)
          : Routes.applicationCommands(clientId),
        { body: commands }
      );

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  };
};
