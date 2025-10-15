import { ComponentType, type APILabelComponent } from "discord.js";
import { type Prettify } from "../helpers";

export class Label {
  constructor(
    private props: Prettify<
      Omit<APILabelComponent, "type" | "component"> & {
        children?: any;
      }
    >
  ) {}

  render() {
    const component = this.props as any;
    component["type"] = ComponentType.Label;
    component["component"] = this.props["children"];
    delete this.props["children"];
    return component;
  }
}
