import Link from "next/link";
import { ListChecks } from "lucide-react";

type LogoProps = {
  href?: string;
};

export default function Logo({ href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="Task Management App home"
      className="flex w-fit items-center gap-3 rounded-lg"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent)] text-white">
        <ListChecks aria-hidden="true" size={20} strokeWidth={2.25} />
      </span>

      <span className="text-lg font-semibold text-white">
        Task Management App
      </span>
    </Link>
  );
}
