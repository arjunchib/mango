import { Glob } from "bun";
import type {
  APIApplicationCommand,
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
} from "discord.js";
// import { watch } from "fs/promises";
import type { PossiblePromise } from "./helpers";

export interface Command {
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

export async function findCommands() {
  const commands = [];
  const glob = new Glob("./app/commands/*.tsx");
  for await (const file of glob.scan({ absolute: true })) {
    const command = (await import(file)) as { default: APIApplicationCommand };
    if (command.default) {
      commands.push(command.default);
    }
  }
  return commands;
}

export async function findController(name: string) {
  return (await import(
    `${process.cwd()}/app/controllers/${name}.tsx`
  )) as Command;
}

// export async function watchCommands() {
//   const watcher = watch("./app/commands/");
//   for await (const event of watcher) {
//     const { eventType, filename } = event;
//     console.log(`Detected ${eventType} in ${filename}`);
//     if (filename) {
//       await import(`${process.cwd()}/app/commands/${filename}`);
//     }
//   }
// }
