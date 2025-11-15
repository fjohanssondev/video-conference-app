import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  name: string;
  dateLabel?: string;
  timeLabel?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  defaultTime?: { hours: number; minutes: number; seconds: number };
}

export function DatePicker({
  name,
  dateLabel = "Date",
  timeLabel = "Time",
  value,
  onChange,
  defaultTime,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const handleChangeDate = (newDate: Date | undefined) => {
    if (!newDate) {
      onChange(undefined);
      return;
    }

    const hours = value?.getHours() ?? defaultTime?.hours ?? 0;
    const minutes = value?.getMinutes() ?? defaultTime?.minutes ?? 0;
    const seconds = value?.getSeconds() ?? defaultTime?.seconds ?? 0;

    newDate.setHours(hours, minutes, seconds);
    onChange(newDate);
    setOpen(false);
  };

  const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeString = e.target.value;
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    const newDate = value ? new Date(value) : new Date();
    newDate.setHours(hours, minutes, seconds);
    onChange(newDate);
  };

  const time = value
    ? `${String(value.getHours()).padStart(2, "0")}:${String(
        value.getMinutes()
      ).padStart(2, "0")}:${String(value.getSeconds()).padStart(2, "0")}`
    : `${defaultTime?.hours.toString().padStart(2, "0")}:${defaultTime?.minutes
        .toString()
        .padStart(2, "0")}:${defaultTime?.seconds.toString().padStart(2, "0")}`;

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor={name} className="px-1">
          {dateLabel}
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id={name}
              className="w-32 justify-between font-normal"
            >
              {value ? value.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              onSelect={handleChangeDate}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor={`${name}-time-picker`} className="px-1">
          {timeLabel}
        </Label>
        <Input
          type="time"
          onChange={handleChangeTime}
          id={`${name}-time-picker`}
          step="1"
          value={time}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}
