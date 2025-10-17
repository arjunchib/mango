import { ComponentType, type APIUserSelectComponent } from "discord.js";
import { type Prettify } from "../helpers";

export class UserSelect {
  constructor(private props: Prettify<Omit<APIUserSelectComponent, "type">>) {}

  render() {
    const component = this.props as any;
    component["type"] = ComponentType.UserSelect;
    return component;
  }
}
