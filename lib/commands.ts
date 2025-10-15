import { Glob } from "bun";
import type {
  APIApplicationCommand,
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
} from "discord.js";
import { watch } from "fs/promises";
import type { PossiblePromise } from "./helpers";

export interface Command {
  command: APIApplicationCommand;
  default: new () => {
    onChatInput?: (
      interaction: ChatInputCommandInteraction
    ) => PossiblePromise<void>;
    onAutocomplete?: (
      interaction: AutocompleteInteraction
    ) => PossiblePromise<void>;
    onModalSubmit?: (
      interaction: ModalSubmitInteraction
    ) => PossiblePromise<void>;
  };
}

const commands = new Map<string, Command>();

export async function findCommands() {
  const glob = new Glob("./app/commands/*.tsx");
  for await (const file of glob.scan({ absolute: true })) {
    const command = (await import(file)) as Command;
    if (command.command) {
      commands.set(command.command.name, command);
    }
  }
  return commands;
}

export async function findCommand(name: string) {
  return (await import(`${process.cwd()}/app/commands/${name}.tsx`)) as Command;
}

export async function watchCommands() {
  const watcher = watch("./app/commands/");
  for await (const event of watcher) {
    const { eventType, filename } = event;
    console.log(`Detected ${eventType} in ${filename}`);
    if (filename) {
      await import(`${process.cwd()}/app/commands/${filename}`);
    }
  }
}
