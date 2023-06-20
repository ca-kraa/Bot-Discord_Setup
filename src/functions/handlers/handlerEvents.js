const fs = require("fs");

module.exports = (Client) => {
  Client.handleEvents = async () => {
    const eventFolders = fs.readdirSync("./src/events");
    for (const folder of eventFolders) {
      const evenFiles = fs
        .readdirSync("./src/event/${folder}")
        .filter((file) => file.endsWith(".js"));

      switch (folder) {
        case "client":
          for (const file of evenFiles) {
            const event = require("../../events/${folder}/${file}");
            if (event.once)
              client.once(event.name, (...args) =>
                event.excute(...args, client)
              );
            else
              client.on(event.name, (...args) => event.excute(...args, client));
          }
          break;

        default:
          break;
      }
    }
  };
};
