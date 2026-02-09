import { useState } from "react";
import { MeasurementGroup, dosingGroups, EventItem } from "./AnalysisData";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, ChevronUp, Beaker, Droplets, CalendarDays, Sparkles, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataSeriesPanelProps {
  measurements: MeasurementGroup[];
  events: EventItem[];
  enabledSources: Record<string, boolean>;
  enabledEvents: Record<string, boolean>;
  onToggleSource: (sourceId: string) => void;
  onToggleEvent: (eventId: string) => void;
}

const eventIconMap = {
  sparkles: Sparkles,
  calendar: CalendarDays,
  droplets: Droplets,
  wrench: Wrench,
};

const DataSeriesPanel = ({
  measurements,
  events,
  enabledSources,
  enabledEvents,
  onToggleSource,
  onToggleEvent,
}: DataSeriesPanelProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    alkalinity: true,
    nitrate: true,
    events: true,
  });

  const toggleGroup = (id: string) =>
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev[id] }));

  const getActiveCount = (group: MeasurementGroup) =>
    group.sources.filter((s) => enabledSources[s.id]).length;

  return (
    <div className="space-y-1">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-1 mb-2">
        Data Series
      </p>

      {/* Measurements */}
      <div className="space-y-0.5">
        <div className="flex items-center gap-2 px-1 py-1.5">
          <Beaker className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-semibold text-foreground">Measurements</span>
        </div>

        {measurements.map((group) => {
          const isOpen = expandedGroups[group.id];
          const activeCount = getActiveCount(group);
          const totalCount = group.sources.length;

          return (
            <div key={group.id} className="ml-2">
              <button
                onClick={() => toggleGroup(group.id)}
                className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium">
                  {group.name}
                  {activeCount > 0 && (
                    <span className="text-muted-foreground ml-1">
                      ({activeCount}/{totalCount})
                    </span>
                  )}
                  {activeCount === 0 && (
                    <span className="text-muted-foreground ml-1">({totalCount})</span>
                  )}
                </span>
                {isOpen ? (
                  <ChevronUp className="h-3 w-3 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                )}
              </button>

              {isOpen && (
                <div className="ml-2 space-y-0.5 pb-1">
                  {group.sources.map((source) => (
                    <div
                      key={source.id}
                      className="flex items-center justify-between rounded-md px-2 py-1 text-xs"
                    >
                      <span
                        className={cn(
                          "text-xs",
                          enabledSources[source.id]
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {source.name}
                      </span>
                      <Switch
                        checked={!!enabledSources[source.id]}
                        onCheckedChange={() => onToggleSource(source.id)}
                        className="scale-75"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dosing */}
      {dosingGroups.map((group) => {
        const isOpen = expandedGroups[group.id];
        return (
          <div key={group.id}>
            <button
              onClick={() => toggleGroup(group.id)}
              className="flex w-full items-center justify-between rounded-md px-1 py-1.5 text-xs hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Droplets className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-semibold text-foreground">{group.name}</span>
              </div>
              {isOpen ? (
                <ChevronUp className="h-3 w-3 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              )}
            </button>
            {isOpen && (
              <div className="ml-5 space-y-0.5 pb-1">
                {group.sources.map((source) => (
                  <div
                    key={source.id}
                    className="flex items-center justify-between rounded-md px-2 py-1 text-xs"
                  >
                    <span className="text-muted-foreground">{source.name}</span>
                    <Switch checked={false} className="scale-75" />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Events */}
      <div>
        <button
          onClick={() => toggleGroup("events")}
          className="flex w-full items-center justify-between rounded-md px-1 py-1.5 text-xs hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-semibold text-foreground">
              Events
              {Object.values(enabledEvents).filter(Boolean).length > 0 && (
                <span className="text-muted-foreground ml-1">
                  ({Object.values(enabledEvents).filter(Boolean).length})
                </span>
              )}
            </span>
          </div>
          {expandedGroups.events ? (
            <ChevronUp className="h-3 w-3 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          )}
        </button>
        {expandedGroups.events && (
          <div className="ml-5 space-y-0.5 pb-1">
            {events.map((evt) => {
              const Icon = eventIconMap[evt.icon];
              return (
                <div
                  key={evt.id}
                  className="flex items-center justify-between rounded-md px-2 py-1 text-xs"
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className="h-3 w-3 text-muted-foreground" />
                    <span
                      className={cn(
                        enabledEvents[evt.id]
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {evt.name}
                    </span>
                  </div>
                  <Switch
                    checked={!!enabledEvents[evt.id]}
                    onCheckedChange={() => onToggleEvent(evt.id)}
                    className="scale-75"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataSeriesPanel;
