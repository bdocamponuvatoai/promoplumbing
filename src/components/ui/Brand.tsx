import Image from "next/image";
import Link from "next/link";
import { logo } from "@/assets/images";
import { site } from "@/config/site";

interface BrandProps {
  className?: string;
  width: number;
  height: number;
  /** The header logo is above the fold; the footer logo can load lazily. */
  eager?: boolean;
}

/** The Promo Plumbing logo, linking home. */
export function Brand({ className, width, height, eager }: BrandProps) {
  return (
    <Link href="/" aria-label={`${site.name} home`} className={className}>
      <Image
        src={logo}
        width={width}
        height={height}
        alt={site.legalName}
        loading={eager ? "eager" : undefined}
      />
    </Link>
  );
}
