import {
  type APIModalInteractionResponseCallbackData,
  type ShowModalOptions,
} from "discord.js";
import { wrapArrayIfNeeded, type Prettify } from "../helpers";

export class Modal {
  constructor(
    private props: Prettify<
      Omit<APIModalInteractionResponseCallbackData, "components"> &
        ShowModalOptions & {
          children?: any[];
        }
    >,
  ) {}

  render() {
    const modal = this.props as any;
    modal["components"] = wrapArrayIfNeeded(modal["children"])
      .flat(Infinity)
      .filter((item) => !!item);
    delete modal["children"];
    return modal;
  }
}
