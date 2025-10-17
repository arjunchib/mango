import {
  BitField,
  MessageFlags,
  TextDisplayBuilder,
  type InteractionReplyOptions,
} from "discord.js";
import { wrapArrayIfNeeded } from "../helpers";

export class Message {
  constructor(
    private props: InteractionReplyOptions & {
      children?: string | any[];
    }
  ) {}

  render() {
    const { children } = this.props;
    this.props["components"] =
      typeof children === "string"
        ? [new TextDisplayBuilder().setContent(children)]
        : wrapArrayIfNeeded(children);
    delete this.props["children"];
    this.props.flags = new BitField(this.props.flags).add(
      MessageFlags.IsComponentsV2
    );
    return this.props;
  }
}
