import {
  Droplets,
  Pipette,
  Settings2,
  ThermometerSun,
  Waves,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconName } from "@/content/services";

const ICONS: Record<ServiceIconName, LucideIcon> = {
  drop: Droplets,
  waves: Waves,
  heat: ThermometerSun,
  tap: Pipette,
  pipe: Settings2,
  wrench: Wrench,
};

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  const Icon = ICONS[name];
  return <Icon strokeWidth={1.5} aria-hidden="true" />;
}
