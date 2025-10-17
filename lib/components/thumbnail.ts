import { ComponentType, type APIThumbnailComponent } from "discord.js";
import { type Prettify } from "../helpers";

export class Thumbnail {
  constructor(private props: Prettify<Omit<APIThumbnailComponent, "type">>) {}

  render() {
    const component = this.props as any;
    component["type"] = ComponentType.Thumbnail;
    return component;
  }
}
