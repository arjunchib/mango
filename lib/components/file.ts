import { ComponentType, type APIFileComponent } from "discord.js";
import { type Prettify } from "../helpers";

export class File {
  constructor(private props: Prettify<Omit<APIFileComponent, "type">>) {}

  render() {
    const file = this.props as any;
    file["type"] = ComponentType.File;
    return this.props;
  }
}
