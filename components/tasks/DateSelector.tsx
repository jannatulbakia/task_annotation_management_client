"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useTaskStore } from "@/store/taskStore";
import {
  toLocalDateString,
  todayString,
  addDays,
  parseLocalDate,
  startOfWeek,
} from "@/lib/date";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function DateSelector() {
  const { selectedDate, setSelectedDate } = useTaskStore();

  // Anchor = the Monday of the displayed week
  const [weekStart, setWeekStart] = useState<Date>(() =>
    startOfWeek(parseLocalDate(selectedDate))
  );

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const monthLabel = (() => {
    const start = weekDays[0];
    const end = weekDays[6];
    if (start.getMonth() === end.getMonth()) {
      return `${MONTH_NAMES[start.getMonth()]} ${start.getFullYear()}`;
    }
    return `${MONTH_NAMES[start.getMonth()]} – ${MONTH_NAMES[end.getMonth()]} ${end.getFullYear()}`;
  })();

  const goToPrevWeek = () => setWeekStart(addDays(weekStart, -7));
  const goToNextWeek = () => setWeekStart(addDays(weekStart, 7));

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(todayString());
    setWeekStart(startOfWeek(today));
  };

  const handleDayClick = (d: Date) => {
    setSelectedDate(toLocalDateString(d));
  };

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const picked = parseLocalDate(e.target.value);
    setSelectedDate(toLocalDateString(picked));
    setWeekStart(startOfWeek(picked));
  };

  const isCurrentWeek =
    toLocalDateString(weekStart) === toLocalDateString(startOfWeek(new Date()));

  return (
    <div className="mb-6 rounded-2xl border border-[#DCE3D7] bg-white p-4 shadow-sm sm:mb-8 sm:p-5">
      {/* Header row */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-[Manrope,sans-serif] text-base font-bold text-[#16241D] sm:text-lg">
          {monthLabel}
        </h2>

        <div className="flex items-center gap-1.5">
          {!isCurrentWeek && (
            <button
              onClick={goToToday}
              className="rounded-lg bg-[#E7F1EA] px-3 py-1.5 font-mono text-xs font-medium text-[#1F6F4A] transition hover:bg-[#DCEBE1]"
            >
              Today
            </button>
          )}

          <button
            onClick={goToPrevWeek}
            aria-label="Previous week"
            className="rounded-lg p-2 text-[#5C6B62] hover:bg-[#F7F8F3]"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={goToNextWeek}
            aria-label="Next week"
            className="rounded-lg p-2 text-[#5C6B62] hover:bg-[#F7F8F3]"
          >
            <ChevronRight size={18} />
          </button>

          <label className="relative cursor-pointer rounded-lg p-2 text-[#5C6B62] hover:bg-[#F7F8F3]">
            <Calendar size={18} />
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateInput}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </label>
        </div>
      </div>

      {/* Day buttons */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {weekDays.map((day) => {
          const iso = toLocalDateString(day);
          const isSelected = iso === selectedDate;
          const isToday = iso === todayString();

          return (
            <button
              key={iso}
              onClick={() => handleDayClick(day)}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-1 py-2 transition-all duration-200 sm:gap-1 sm:rounded-xl sm:px-2 sm:py-3 ${
                isSelected
                  ? "bg-[#1F6F4A] text-white shadow-sm"
                  : isToday
                  ? "border border-[#1F6F4A]/40 text-[#1F6F4A] hover:bg-[#E7F1EA]"
                  : "text-[#5C6B62] hover:bg-[#F7F8F3]"
              }`}
            >
              <span className="text-[10px] font-medium sm:text-xs">
                {DAY_NAMES[day.getDay()]}
              </span>
              <span
                className={`text-base font-bold sm:text-xl ${
                  isSelected ? "text-white" : ""
                }`}
              >
                {day.getDate()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected date label */}
      <p className="mt-3 text-center text-xs text-[#5C6B62] sm:text-sm">
        Showing tasks for{" "}
        <span className="font-semibold text-[#16241D]">
          {parseLocalDate(selectedDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </p>
    </div>
  );
}