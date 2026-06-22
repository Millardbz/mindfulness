import { createElement } from "react";
import {
  Brain,
  Compass,
  Flower2,
  HandHeart,
  Heart,
  Leaf,
  Moon,
  Sparkles,
  Sprout,
  Sun,
  Users,
  Waves,
  Wind,
} from "lucide-react";

type IconComponent = React.ComponentType<{ className?: string }>;

/** Curated icon set shared by the value-prop and offering schemas + renderers. */
const ICONS: Record<string, IconComponent> = {
  Leaf,
  Sprout,
  Flower2,
  Heart,
  HandHeart,
  Wind,
  Waves,
  Sun,
  Moon,
  Sparkles,
  Brain,
  Compass,
  Users,
};

export const ICON_NAMES = Object.keys(ICONS);

export function getIcon(name?: string): IconComponent {
  return (name && ICONS[name]) || Sparkles;
}

/**
 * Render a named icon. Uses createElement (not JSX with a render-bound
 * component) so it stays compatible with the react-hooks static-components rule.
 */
export function Icon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  return createElement(getIcon(name), { className });
}
