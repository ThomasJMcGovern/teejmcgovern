import type { Metadata } from "next";
import { ProfileShell } from "@/components/vibes/profile/profile-shell";

export const metadata: Metadata = {
  title: "Profile — TJ McGovern",
  description:
    "Boot into TJ_OS — a designer-engineer's operating system. Learn about TJ McGovern: vision, approach, background, stack, and work.",
};

export default function Page() {
  return <ProfileShell />;
}
