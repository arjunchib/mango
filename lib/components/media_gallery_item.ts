import type { MediaGalleryItemData } from "discord.js";

export class MediaGalleryItem {
  constructor(private props: MediaGalleryItemData) {}

  render() {
    return this.props;
  }
}
