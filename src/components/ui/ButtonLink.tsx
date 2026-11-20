import { SmartLink, type SmartLinkProps } from "./SmartLink";

type ButtonVariant = "dark" | "white" | "outline";

interface ButtonLinkProps extends SmartLinkProps {
  variant?: ButtonVariant;
}

/** A link styled as a button: `.btn` plus an optional `.btn-<variant>`. */
export function ButtonLink({ variant, className, ...rest }: ButtonLinkProps) {
  const classes = ["btn", variant && `btn-${variant}`, className]
    .filter(Boolean)
    .join(" ");
  return <SmartLink className={classes} {...rest} />;
}
