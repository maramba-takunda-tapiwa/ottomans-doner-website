export type OpeningHoursMap = Record<number, { open: string; close: string }>; // 0=Sun

// Debrecen local schedule (example)
// Updated schedule (local time Europe/Budapest)
// Sat 11–24, Sun–Thu 11–23, Fri 11–24
export const OPENING_HOURS: OpeningHoursMap = {
  0: { open: '11:00', close: '23:00' }, // Sunday
  1: { open: '11:00', close: '23:00' }, // Monday
  2: { open: '11:00', close: '23:00' }, // Tuesday
  3: { open: '11:00', close: '23:00' }, // Wednesday
  4: { open: '11:00', close: '23:00' }, // Thursday
  5: { open: '11:00', close: '24:00' }, // Friday (midnight)
  6: { open: '11:00', close: '24:00' }, // Saturday (midnight)
};

export function parseTimeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

export function isOpenNow(date = new Date()): { open: boolean; until: string } {
  // Convert to Europe/Budapest timezone by constructing with locale
  const localeString = date.toLocaleString('en-US', { timeZone: 'Europe/Budapest' });
  const local = new Date(localeString);
  const day = local.getDay();
  const hours = OPENING_HOURS[day];
  if (!hours) return { open: false, until: '' };
  const currentMinutes = local.getHours() * 60 + local.getMinutes();
  const openMinutes = parseTimeToMinutes(hours.open);
  const closeMinutes = parseTimeToMinutes(hours.close);
  const open = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  return { open, until: open ? hours.close : hours.open };
}
