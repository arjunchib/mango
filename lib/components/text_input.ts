import { ComponentType, type APITextInputComponent } from "discord.js";
import { type Prettify } from "../helpers";

export class TextInput {
  constructor(private props: Prettify<Omit<APITextInputComponent, "type">>) {}

  render() {
    const component = this.props as any;
    component["type"] = ComponentType.TextInput;
    return component;
  }
}
