import {
  ComponentType,
  type APIContainerComponent,
  type APISectionComponent,
} from "discord.js";
import { wrapArrayIfNeeded, type Prettify } from "../helpers";

export class Section {
  constructor(
    private props: Prettify<
      Omit<APISectionComponent, "type" | "components"> & { children: any }
    >
  ) {}

  render() {
    const component = this.props as any;
    component["type"] = ComponentType.Section;
    component["components"] = wrapArrayIfNeeded(component["children"]);
    delete component["children"];
    return component;
  }
}
