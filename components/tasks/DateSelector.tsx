"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useTaskStore } from "@/store/taskStore";

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  const result = new Date(d);
  result.setDate(result.getDate() + n);
  return result;
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function DateSelector() {
  const { selectedDate, setSelectedDate } = useTaskStore();

  // Anchor = the Monday of the displayed week
  const [weekStart, setWeekStart] = useState<Date>(() => {
    const today = new Date(selectedDate);
    const day = today.getDay(); // 0 = Sun
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((day + 6) % 7));
    return monday;
  });

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

  const handleDayClick = (d: Date) => {
    setSelectedDate(formatDate(d));
  };

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const picked = new Date(e.target.value + "T00:00:00");
    setSelectedDate(formatDate(picked));
    // Re-anchor the week to show the picked date
    const day = picked.getDay();
    const monday = new Date(picked);
    monday.setDate(picked.getDate() - ((day + 6) % 7));
    setWeekStart(monday);
  };

  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      {/* Header row */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">{monthLabel}</h2>

        <div className="flex items-center gap-2">
          {/* Prev / Next week */}
          <button
            onClick={goToPrevWeek}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={goToNextWeek}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <ChevronRight size={18} />
          </button>

          {/* Calendar picker */}
          <label className="relative cursor-pointer rounded-lg p-2 text-slate-500 hover:bg-slate-100">
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
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => {
          const iso = formatDate(day);
          const isSelected = iso === selectedDate;
          const isToday = iso === formatDate(new Date());

          return (
            <button
              key={iso}
              onClick={() => handleDayClick(day)}
              className={`flex flex-col items-center gap-1 rounded-xl px-2 py-3 transition-all duration-200 ${
                isSelected
                  ? "bg-blue-600 text-white shadow-md"
                  : isToday
                  ? "border border-blue-300 text-blue-600 hover:bg-blue-50"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span className="text-xs font-medium">
                {DAY_NAMES[day.getDay()]}
              </span>
              <span className={`text-xl font-bold ${isSelected ? "text-white" : ""}`}>
                {day.getDate()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected date label */}
      <p className="mt-3 text-center text-sm text-slate-500">
        Showing tasks for{" "}
        <span className="font-semibold text-slate-700">
          {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
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
