"use client";
import { useRef, type ReactNode, type PointerEvent } from "react";
export default function ManufacturingSurface({
  children,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const b = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - b.left) / b.width,
      y = (event.clientY - b.top) / b.height;
    const el = host.current;
    if (!el) return;
    el.style.setProperty("--lift", "-12px");
    el.style.setProperty("--rx", (0.5 - y) * 7 + "deg");
    el.style.setProperty("--ry", (x - 0.5) * 8 + "deg");
    el.style.setProperty("--light-x", x * 100 + "%");
    el.style.setProperty("--light-y", y * 100 + "%");
  }
  function reset() {
    host.current?.style.setProperty("--lift", "0px");
    host.current?.style.setProperty("--rx", "0deg");
    host.current?.style.setProperty("--ry", "0deg");
  }
  return (
    <div
      className="h-full [perspective:1100px]"
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <div
        ref={host}
        className={
          "relative isolate h-full rounded-[30px] border transition-transform duration-200 [transform-style:preserve-3d] motion-safe:[transform:translateY(var(--lift,0px))_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] " +
          (dark
            ? "border-[#d1b278]/25 bg-gradient-to-br from-[#39342b] via-[#25221d] to-[#181714] shadow-[2px_3px_0_#8b734b,7px_9px_0_#11100e,0_28px_45px_-25px_black]"
            : "border-white bg-gradient-to-br from-white via-[#faf7ef] to-[#e6dcc8] shadow-[2px_3px_0_#f9efda,7px_9px_0_#c5b494,0_28px_45px_-25px_#6d5734]") +
          " " +
          className
        }
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-60 [background:radial-gradient(circle_at_var(--light-x,20%)_var(--light-y,0%),rgba(255,255,255,0.16),transparent_65%)]"
        />
        {children}
      </div>
    </div>
  );
}
