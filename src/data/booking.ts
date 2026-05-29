export const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
] as const;

/** Simulated unavailable slots per day (hash-based for consistency) */
export function getUnavailableSlots(date: Date): string[] {
  const seed = date.getDate() + date.getMonth() * 31;
  const unavailable: string[] = [];
  TIME_SLOTS.forEach((slot, i) => {
    if ((seed + i * 7) % 5 === 0) unavailable.push(slot);
  });
  return unavailable;
}

export function isSlotAvailable(date: Date, slot: string): boolean {
  return !getUnavailableSlots(date).includes(slot);
}
