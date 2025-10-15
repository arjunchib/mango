import { type RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { wrapArrayIfNeeded, type Prettify } from "../helpers";

export class SlashCommand {
  constructor(public props: Props) {}

  render(): RESTPostAPIChatInputApplicationCommandsJSONBody {
    if (this.props["children"]) {
      (this.props as any)["options"] = wrapArrayIfNeeded(
        this.props["children"]
      );
      delete this.props["children"];
    }
    return this.props;
  }
}

type Props = Prettify<
  Omit<RESTPostAPIChatInputApplicationCommandsJSONBody, "options"> & {
    children?: any;
  }
>;
