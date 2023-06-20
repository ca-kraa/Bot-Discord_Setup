const fs = require("fs");

module.exports = (client) => {
  client.handleEvents = async () => {
    const eventFolders = fs.readdirSync("./src/events");
    for (const folder of eventFolders) {
      const eventFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of eventFiles) {
        const event = require(`../../events/${folder}/${file}`);
        const eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
      }
    }
  };
};
