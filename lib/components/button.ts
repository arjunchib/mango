import {
  ButtonStyle,
  ComponentType,
  type APIButtonComponent,
} from "discord.js";
import { type Prettify } from "../helpers";

type RemoveType<T> = T extends any ? Omit<T, "type"> : never;

export class Button {
  constructor(
    private props: Prettify<
      RemoveType<APIButtonComponent> & { children?: string }
    >
  ) {}

  render() {
    const component = this.props as any;
    component["type"] = ComponentType.Button;
    if (component["children"] != null && component["label"] == null) {
      component["label"] = component["children"];
    }
    delete component["children"];
    return component;
  }
}
