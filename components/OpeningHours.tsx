"use client";
import { useEffect, useState } from 'react';
import { isOpenNow, OPENING_HOURS } from '../lib/openingHours';

export function OpeningHours() {
  const [status, setStatus] = useState(() => isOpenNow());

  useEffect(() => {
    const interval = setInterval(() => setStatus(isOpenNow()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm flex flex-col gap-4">
      <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-cream/80">
        {Object.entries(OPENING_HOURS).map(([day, v]) => {
          const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
          const today = new Date().getDay();
          const isToday = Number(day) === today;
          return (
            <li key={day} className={`flex justify-between ${isToday ? 'text-gold font-semibold' : ''}`}>
              <span className="min-w-[80px]">{dayNames[Number(day)]}</span>
              <span className="text-cream/70">{v.open} – {v.close}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default OpeningHours;
