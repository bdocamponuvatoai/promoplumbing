import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type SmartLinkProps = ComponentPropsWithoutRef<"a"> & { href: string };

/**
 * Internal paths ("/…") use next/link for client-side navigation. Everything
 * else (tel:, mailto:, #hash, external) is a plain anchor with its attributes
 * passed through untouched.
 */
export function SmartLink({ href, ...rest }: SmartLinkProps) {
  if (href.startsWith("/")) return <Link href={href} {...rest} />;
  return <a href={href} {...rest} />;
}
