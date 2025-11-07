import {
  ApplicationCommandOptionBase,
  ApplicationCommandOptionType,
  SlashCommandBuilder,
} from "discord.js";
import type { Partialize, Prettify } from "../helpers";

export class Option {
  constructor(public props: Props) {}

  render() {
    const type = ApplicationCommandOptionType[this.props.type];
    (this.props as any).type = type;
    return this.props;
  }
}

type FilterOption<X> = X extends ApplicationCommandOptionBase ? X : never;

type OptionKeys = OptionKeysInner<keyof SlashCommandBuilder>;
type OptionKeysInner<T> = T extends `add${infer Rest}Option` ? Rest : never;

type GetOption<T extends OptionKeys> = Parameters<
  SlashCommandBuilder[`add${T}Option`]
> extends Array<infer X>
  ? NoFunctions<FilterOption<X>>
  : never;

type NoFunctions<T> = {
  [P in keyof T as T[P] extends (...args: any) => any ? never : P]: T[P];
};

type OptionProps = {
  [P in OptionKeys]: Prettify<
    Partialize<Omit<GetOption<P>, "type">> & {
      type: P;
    }
  >;
};

type Props = OptionProps[OptionKeys];
