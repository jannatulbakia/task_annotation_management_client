// Local-date helpers. Using toISOString() anywhere below would read the
// UTC date instead of the user's local date — for timezones ahead of UTC
// that makes "today" report yesterday's date for the first few hours after
// local midnight. Everything here stays in local time.

export function toLocalDateString(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function todayString(): string {
  return toLocalDateString(new Date());
}

export function addDays(d: Date, n: number): Date {
  const result = new Date(d);
  result.setDate(result.getDate() + n);
  return result;
}

// Parses a "YYYY-MM-DD" string as local midnight, not UTC midnight.
export function parseLocalDate(iso: string): Date {
  return new Date(iso + "T00:00:00");
}

export function startOfWeek(d: Date): Date {
  const day = d.getDay(); // 0 = Sun
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((day + 6) % 7));
  return monday;
}