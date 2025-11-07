import { Client, Events, GatewayIntentBits } from "discord.js";
import { findController } from "./commands";

declare global {
  var client: Client | undefined;
}

export function bootstrap() {
  if (!globalThis.client) {
    globalThis.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
    });
    globalThis.client.on(Events.ClientReady, (readyClient) => {
      console.log(`Logged in as ${readyClient.user.tag}!`);
    });
    globalThis.client.on(Events.InteractionCreate, async (interaction) => {
      if (interaction.isChatInputCommand()) {
        const { commandName } = interaction;
        const module = await findController(commandName);
        const cmd = new module.default();
        const res = cmd?.onChatInput?.(interaction);
        if (res instanceof Promise) await res;
      } else if (interaction.isAutocomplete()) {
        const { commandName } = interaction;
        const module = await findController(commandName);
        const cmd = new module.default();
        const res = cmd?.onAutocomplete?.(interaction);
        if (res instanceof Promise) await res;
      } else if (interaction.isModalSubmit()) {
        const commandName =
          interaction.customId.split(":").at(0) || interaction.customId;
        const module = await findController(commandName);
        const cmd = new module.default();
        const res = cmd?.onModalSubmit?.(interaction);
        if (res instanceof Promise) await res;
      } else if (interaction.isButton()) {
        const commandName =
          interaction.customId.split(":").at(0) || interaction.customId;
        const module = await findController(commandName);
        const cmd = new module.default();
        const res = cmd?.onButton?.(interaction);
        if (res instanceof Promise) await res;
      }
    });
    globalThis.client.login(Bun.env.TOKEN!);
  }
  return globalThis.client;
}
