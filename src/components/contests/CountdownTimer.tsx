import { useEffect, useState } from "react";
import { useTranslations } from "@/i18n/useTranslations";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function isContestEnded(endDate: string): boolean {
  return new Date(endDate).getTime() <= Date.now();
}

function calcTimeLeft(endDate: string): TimeLeft | null {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer({ endDate }: { endDate: string }) {
  const t = useTranslations("contests");
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    calcTimeLeft(endDate)
  );

  useEffect(() => {
    const tick = () => setTimeLeft(calcTimeLeft(endDate));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endDate]);

  if (!timeLeft) return null;

  const units = [
    { value: timeLeft.days, label: t("day") },
    { value: timeLeft.hours, label: t("hour") },
    { value: timeLeft.minutes, label: t("minute") },
    { value: timeLeft.seconds, label: t("second") },
  ];

  return (
    <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-white/95 px-2 py-1.5 shadow-md">
      {units.map((unit, idx) => (
        <div key={unit.label} className="flex items-center gap-1">
          <div className="flex flex-col items-center min-w-[36px]">
            <span className="text-lg font-bold leading-none text-[#0085d4]">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] uppercase text-gray-500">
              {unit.label}
            </span>
          </div>
          {idx < units.length - 1 && (
            <span className="text-[#0085d4] font-bold pb-3">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
