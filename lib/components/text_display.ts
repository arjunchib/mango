import { ComponentType, type APITextDisplayComponent } from "discord.js";
import type { Prettify } from "../helpers";

export class TextDisplay {
  constructor(
    private props: Prettify<
      Omit<APITextDisplayComponent, "content" | "type"> & {
        children: string | string[];
      }
    >
  ) {}

  render() {
    const component = this.props as any;
    const { children } = component;
    component["content"] = Array.isArray(children)
      ? children.join(" ")
      : children;
    delete component.children;
    component.type = ComponentType.TextDisplay;
    return component;
  }
}
