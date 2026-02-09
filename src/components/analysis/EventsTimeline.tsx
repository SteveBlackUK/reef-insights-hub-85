import { EventItem } from "./AnalysisData";
import { Sparkles, CalendarDays, Droplets, Wrench } from "lucide-react";

const iconMap = {
  sparkles: Sparkles,
  calendar: CalendarDays,
  droplets: Droplets,
  wrench: Wrench,
};

interface EventsTimelineProps {
  events: EventItem[];
  enabledEvents: Record<string, boolean>;
}

const EventsTimeline = ({ events, enabledEvents }: EventsTimelineProps) => {
  const active = events.filter((e) => enabledEvents[e.id]);

  if (active.length === 0) return null;

  return (
    <div className="rounded-lg border border-border/50 bg-card p-4">
      <h4 className="text-sm font-heading font-semibold mb-3">Events</h4>
      <div className="relative">
        {/* Timeline bar */}
        <div className="h-0.5 bg-border/50 rounded-full w-full absolute top-3" />
        <div className="flex justify-between relative">
          {active.map((evt) => {
            const Icon = iconMap[evt.icon];
            return (
              <div key={evt.id} className="flex flex-col items-center gap-1">
                <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center z-10">
                  <Icon className="h-3 w-3 text-primary" />
                </div>
                <span className="text-[10px] text-muted-foreground text-center max-w-[60px] leading-tight">
                  {evt.name}
                </span>
                <span className="text-[9px] text-muted-foreground/60">{evt.date.replace(", 2026", "")}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventsTimeline;
