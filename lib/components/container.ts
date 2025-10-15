import { ComponentType, type APIContainerComponent } from "discord.js";
import { wrapArrayIfNeeded, type Prettify } from "../helpers";

export class Container {
  constructor(
    private props: Prettify<
      Omit<APIContainerComponent, "type" | "components"> & { children: any }
    >
  ) {}

  render() {
    const component = this.props as any;
    component["type"] = ComponentType.Container;
    component["components"] = wrapArrayIfNeeded(component["children"]);
    delete component["children"];
    return component;
  }
}
