import { ComponentType, type APIMediaGalleryComponent } from "discord.js";
import { wrapArrayIfNeeded, type Prettify } from "../helpers";

export class MediaGallery {
  constructor(
    private props: Prettify<
      Omit<APIMediaGalleryComponent, "type" | "items"> & { children: any }
    >
  ) {}

  render() {
    const mediaGallery = this.props as any;
    mediaGallery["type"] = ComponentType.MediaGallery;
    mediaGallery["items"] = wrapArrayIfNeeded(mediaGallery["children"]);
    delete mediaGallery["children"];
    return mediaGallery;
  }
}
