import { REST, Routes } from "discord.js";
import { findCommands } from "./commands";

const rest = new REST().setToken(Bun.env.TOKEN!);

export async function push() {
  await rest.put(
    Routes.applicationGuildCommands(Bun.env.APPLICATION_ID!, Bun.env.GUILD_ID!),
    { body: await findCommands() }
  );
}
