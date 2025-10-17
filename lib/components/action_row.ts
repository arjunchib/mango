import { ComponentType, type APIComponentInMessageActionRow } from "discord.js";
import { wrapArrayIfNeeded } from "../helpers";

export class ActionRow {
  constructor(
    private props: {
      children?:
        | APIComponentInMessageActionRow
        | APIComponentInMessageActionRow[];
    }
  ) {}

  render() {
    return {
      type: ComponentType.ActionRow,
      components: wrapArrayIfNeeded(this.props?.children),
    };
  }
}
