import { ComponentType, type APISeparatorComponent } from "discord.js";
import { type Prettify } from "../helpers";

export class Separator {
  constructor(private props: Prettify<Omit<APISeparatorComponent, "type">>) {}

  render() {
    const component = this.props as any;
    component["type"] = ComponentType.Separator;
    return component;
  }
}
