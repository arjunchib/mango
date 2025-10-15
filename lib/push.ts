import { REST, Routes } from "discord.js";
import { findCommands } from "./commands";

const rest = new REST().setToken(Bun.env.TOKEN!);

export async function push() {
  const commands = await findCommands();
  const body = [...commands.values()].map((c) => c.command);
  await rest.put(
    Routes.applicationGuildCommands(Bun.env.APPLICATION_ID!, Bun.env.GUILD_ID!),
    { body }
  );
}
