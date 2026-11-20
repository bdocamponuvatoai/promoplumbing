import { SmartLink, type SmartLinkProps } from "./SmartLink";

/** Underlined inline call to action (`.text-link`). */
export function TextLink({ className, ...rest }: SmartLinkProps) {
  return (
    <SmartLink
      className={className ? `text-link ${className}` : "text-link"}
      {...rest}
    />
  );
}
