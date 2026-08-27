import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Landing sahifadagi barcha slayderlar uchun yagona navigatsiya uslubi
 * (Yangiliklar, Ekspertlar fikri, Qamrov).
 */
const BUTTON_CLASS =
  "flex h-11 w-11 items-center justify-center rounded-xl border border-[#0085d4]/30 bg-white !text-[#0b57d0] shadow-sm transition-colors duration-300 hover:bg-[#0085d4] hover:!text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:!text-[#0b57d0] dark:border-gray-600 dark:bg-gray-800 dark:!text-white";

type SliderNavButtonProps = {
  direction: "prev" | "next";
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
};

export function SliderNavButton({
  direction,
  onClick,
  disabled,
  label,
}: SliderNavButtonProps) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label ?? (direction === "prev" ? "Previous" : "Next")}
      className={BUTTON_CLASS}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

type SliderDotsProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function SliderDots({ count, activeIndex, onSelect }: SliderDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Slide ${index + 1}`}
          onClick={() => onSelect(index)}
          className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
            index === activeIndex
              ? "bg-[#0b57d0]"
              : "bg-[#0b57d0]/25 hover:bg-[#0b57d0]/50"
          }`}
        />
      ))}
    </div>
  );
}

/** Tugmalarni (va ixtiyoriy nuqtalarni) markazlashtiruvchi qator */
export function SliderNav({
  onPrev,
  onNext,
  disabled,
  children,
  className = "",
}: {
  onPrev: () => void;
  onNext: () => void;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mt-8 flex items-center justify-center ${children ? "gap-6" : "gap-4"} ${className}`}
    >
      <SliderNavButton direction="prev" onClick={onPrev} disabled={disabled} />
      {children}
      <SliderNavButton direction="next" onClick={onNext} disabled={disabled} />
    </div>
  );
}
