import { DEFAULT_RESIZED_IMAGE_WIDTH } from "../constants";
import { Maybe } from "../interface/utils";

interface ImageSize {
  width?: number;
  height?: number;
}

export class FormatImageUrl {
  reactAppBaseImageUrl: string;

  static instance: FormatImageUrl;

  constructor(reactAppBaseImageUrl: string) {
    this.reactAppBaseImageUrl = reactAppBaseImageUrl;

    if (!FormatImageUrl.instance) {
      FormatImageUrl.instance = this;
    }
    return FormatImageUrl.instance;
  }

  formatImageUrl = (
    url?: Maybe<string>,
    size: ImageSize = { width: DEFAULT_RESIZED_IMAGE_WIDTH }
  ) => {
    const baseImageUrl = this.reactAppBaseImageUrl;
    if (!url || (Array.isArray(url) && !url.length)) return "";
    if (!baseImageUrl || !url?.match(baseImageUrl)) return url;
    const key = url?.split("/")?.length > 1 ? url?.split("/")?.pop() : null;
    const { width, height } = size;
    return key
      ? `${this.reactAppBaseImageUrl}/${key}?size=${width}${
          height?.toString() ? `x${height}` : ""
        }`
      : "";
  };
}
