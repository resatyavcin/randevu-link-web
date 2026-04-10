import { format, isBefore, startOfDay } from "date-fns";
import { tr } from "date-fns/locale";
import { CalendarIcon, Loader2Icon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { AvailableSlot } from "@/lib/types";

type StepDateTimeProps = {
  employeeId: string;
  serviceId: string;
  date: Date | undefined;
  onDateChange: (d: Date | undefined) => void;
  calendarOpen: boolean;
  onCalendarOpenChange: (open: boolean) => void;
  loadingSlots: boolean;
  selectableSlots: AvailableSlot[];
  selectedSlot: AvailableSlot | null;
  onSelectSlot: (slot: AvailableSlot) => void;
};

export function StepDateTime({
  employeeId,
  serviceId,
  date,
  onDateChange,
  calendarOpen,
  onCalendarOpenChange,
  loadingSlots,
  selectableSlots,
  selectedSlot,
  onSelectSlot,
}: StepDateTimeProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-2">
        <Label className="text-sm font-medium">Tarih</Label>
        <Popover open={calendarOpen} onOpenChange={onCalendarOpenChange}>
          <PopoverTrigger
            type="button"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "h-10 w-full justify-start text-left text-sm font-normal",
            )}
          >
            <CalendarIcon className="mr-2 size-4 shrink-0" />
            {date
              ? format(date, "d MMMM yyyy", { locale: tr })
              : "Tarih seçin"}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                onDateChange(d);
                onCalendarOpenChange(false);
              }}
              locale={tr}
              disabled={(d) =>
                isBefore(startOfDay(d), startOfDay(new Date()))
              }
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid gap-2">
        <Label className="text-sm font-medium">Müsait saatler</Label>
        {loadingSlots ? (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2Icon className="size-4 animate-spin" />
            Saatler yükleniyor…
          </div>
        ) : selectableSlots.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            {employeeId && serviceId && date
              ? "Seçilen gün için uygun saat bulunamadı."
              : "Önce bir önceki adımda çalışan ve hizmet seçin."}
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectableSlots.map((slot) => {
              const active = selectedSlot?.startTime === slot.startTime;
              return (
                <Button
                  key={slot.startTime}
                  type="button"
                  variant={active ? "default" : "outline"}
                  size="default"
                  className="min-w-16 text-sm"
                  onClick={() => onSelectSlot(slot)}
                >
                  {format(new Date(slot.startTime), "HH:mm")}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
