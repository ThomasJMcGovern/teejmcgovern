import {
  Globe,
  Image as ImageIcon,
  MessageCircle,
  FileQuestion,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  globe: Globe,
  image: ImageIcon,
  "message-circle": MessageCircle,
};

/** Resolves a registry icon name to a lucide icon. */
export function Glyph({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? FileQuestion;
  return <Icon className={className} aria-hidden />;
}
