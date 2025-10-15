import { type InteractionReplyOptions } from "discord.js";
import { wrapArrayIfNeeded } from "../helpers";

export class Message {
  constructor(
    private props: InteractionReplyOptions & {
      children?: any[];
    }
  ) {}

  render() {
    const { children } = this.props;
    this.props["components"] = wrapArrayIfNeeded(children);
    delete this.props["children"];
    return this.props;
  }
}
