export const WORKSHOP_CYCLE_SECONDS = 6.8;
export interface WorkshopTimeline {
  cycle: number;
  phase: number;
  pickup: number;
  store: number;
  travel: number;
  load: number;
  outgoing: number;
  middle: number;
  left: number;
  incoming: number;
  storedCount: number;
}
const clamp = (value: number) => Math.max(0, Math.min(1, value));
export function getWorkshopTimeline(
  seconds: number,
  total: number,
  offset = 0,
): WorkshopTimeline {
  const time = Math.max(0, seconds);
  const cycle = Math.floor(time / WORKSHOP_CYCLE_SECONDS);
  const phase = time - cycle * WORKSHOP_CYCLE_SECONDS;
  const index = (value: number) =>
    (((value + offset) % Math.max(1, total)) + Math.max(1, total)) % Math.max(1, total);
  return {
    cycle,
    phase,
    pickup: clamp(phase / 0.8),
    store: clamp((phase - 0.8) / 0.6),
    travel: clamp((phase - 2.4) / 4.4),
    load: clamp((phase - 4.4) / 1.2),
    outgoing: index(cycle),
    middle: index(cycle + 1),
    left: index(cycle + 2),
    incoming: index(cycle + 3),
    storedCount: cycle + (phase >= 1.9 ? 1 : 0),
  };
}
export function smoothStep(value: number): number {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
}
