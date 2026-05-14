import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useUiStore } from "../../store/useUiStore.ts";
import type { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover.tsx";
import { Button } from "../../components/ui/button.tsx";
import { Calendar } from "../../components/ui/calendar.tsx";

export function DateFilter() {
  const dateFilter = useUiStore(s => s.dateFilter);
  const setDateFilter = useUiStore(s => s.setDateFilter);
  const [open, setOpen] = useState(false);

  // Convert store strings → Date objects for react-day-picker
  const selected: DateRange = {
    from: dateFilter?.start ? new Date(dateFilter.start) : undefined,
    to: dateFilter?.end ? new Date(dateFilter.end) : undefined,
  };

  const handleSelect = (range: DateRange | undefined) => {
    if (!range) {
      setDateFilter(null);
      return;
    }
    setDateFilter({
      start: range.from ? format(range.from, "yyyy-MM") : "",
      end: range.to ? format(range.to, "yyyy-MM") : "",
    });
    // Close once both ends are picked
    if (range.from && range.to) setOpen(false);
  };

  const label = selected.from
    ? selected.to
      ? `${format(selected.from, "MMM yyyy")} – ${format(selected.to, "MMM yyyy")}`
      : format(selected.from, "MMM yyyy")
    : "Filter by date";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 text-sm font-normal">
          <CalendarIcon className="h-4 w-4"/>
          {label}
          {dateFilter && (
            <span
              className="ml-1 text-gray-400 hover:text-gray-600"
              onClick={e => {
                e.stopPropagation();
                setDateFilter(null);
              }}
            >
              ✕
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={selected}
          onSelect={handleSelect}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}