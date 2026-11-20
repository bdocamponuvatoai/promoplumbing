import type { StaticImageData } from "next/image";
import business from "./business.webp";
import hero from "./hero.webp";
import home from "./home.webp";

export { default as logo } from "./promo-logo.svg";
export { default as mark } from "./promo-mark.svg";

/** AI-generated illustrative photography (see README, "Before launch"). */
export const photos = { hero, home, business } satisfies Record<
  string,
  StaticImageData
>;

export type PhotoKey = keyof typeof photos;
