module.exports = {
  name: "interactionCreate",
  once: true,
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = command.get(commandName);

      if (!command) return;
      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "Something Went Wrong while exacuting this command...",
          ephemeral: true,
        });
      }
    }
  },
};
