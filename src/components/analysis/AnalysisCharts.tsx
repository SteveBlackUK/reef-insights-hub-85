import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} from "recharts";
import {
  MeasurementGroup, seriesData, latestValues, EventItem,
} from "./AnalysisData";

interface AnalysisChartsProps {
  mode: "stacked" | "combined";
  measurements: MeasurementGroup[];
  enabledSources: Record<string, boolean>;
  showTaskCompletions: boolean;
  enabledEvents: Record<string, boolean>;
  events: EventItem[];
}

/** Get all active series across all groups */
function getActiveSeries(
  measurements: MeasurementGroup[],
  enabledSources: Record<string, boolean>
) {
  const result: {
    sourceId: string;
    label: string;
    groupName: string;
    unit: string;
    color: string;
    data: { date: string; value: number }[];
  }[] = [];

  const colors = [
    "hsl(210, 80%, 55%)",
    "hsl(145, 60%, 45%)",
    "hsl(25, 85%, 55%)",
    "hsl(280, 60%, 55%)",
    "hsl(340, 70%, 55%)",
    "hsl(50, 80%, 45%)",
    "hsl(195, 70%, 50%)",
  ];
  let colorIdx = 0;

  measurements.forEach((group) => {
    group.sources.forEach((source) => {
      if (enabledSources[source.id] && seriesData[source.id]) {
        result.push({
          sourceId: source.id,
          label: `${group.name} - ${source.name}`,
          groupName: group.name,
          unit: group.unit,
          color: colors[colorIdx % colors.length],
          data: seriesData[source.id],
        });
        colorIdx++;
      }
    });
  });
  return result;
}

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize: 12,
};

const AnalysisCharts = ({
  mode,
  measurements,
  enabledSources,
  showTaskCompletions,
  enabledEvents,
  events,
}: AnalysisChartsProps) => {
  const activeSeries = getActiveSeries(measurements, enabledSources);

  if (activeSeries.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
        Select data series from the panel to view charts
      </div>
    );
  }

  // Event reference lines
  const activeEvents = events.filter((e) => enabledEvents[e.id]);

  if (mode === "stacked") {
    return <StackedView series={activeSeries} events={activeEvents} showEvents={showTaskCompletions} />;
  }
  return <CombinedView series={activeSeries} events={activeEvents} showEvents={showTaskCompletions} />;
};

function StackedView({
  series,
  events,
  showEvents,
}: {
  series: ReturnType<typeof getActiveSeries>;
  events: EventItem[];
  showEvents: boolean;
}) {
  return (
    <div className="space-y-4">
      {series.map((s) => {
        const latest = latestValues[s.sourceId];
        return (
          <div key={s.sourceId} className="rounded-lg border border-border/50 bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: s.color }}
                />
                <span className="font-heading font-semibold text-sm">{s.label}</span>
                {s.unit && (
                  <span className="text-muted-foreground text-xs">({s.unit})</span>
                )}
              </div>
              {latest && (
                <span className="text-xs text-muted-foreground">
                  Latest: <span className="font-semibold text-foreground">{latest.value} {latest.unit}</span>
                </span>
              )}
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={s.data} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  tickLine={false}
                  axisLine={false}
                  domain={["auto", "auto"]}
                />
                <Tooltip contentStyle={tooltipStyle} />
                {showEvents &&
                  events.map((evt) => (
                    <ReferenceLine
                      key={evt.id}
                      x={evt.date.replace(", 2026", "")}
                      stroke="hsl(var(--primary))"
                      strokeDasharray="4 4"
                      strokeWidth={1}
                      label={{
                        value: evt.name,
                        position: "top",
                        fill: "hsl(var(--primary))",
                        fontSize: 9,
                      }}
                    />
                  ))}
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={s.color}
                  strokeWidth={2}
                  dot={{ r: 2, fill: s.color }}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
}

function CombinedView({
  series,
  events,
  showEvents,
}: {
  series: ReturnType<typeof getActiveSeries>;
  events: EventItem[];
  showEvents: boolean;
}) {
  // Normalize each series to % change from average
  const maxPoints = Math.max(...series.map((s) => s.data.length));
  const combinedData: Record<string, unknown>[] = [];

  // Build date list from longest series
  const longestSeries = series.reduce((a, b) => (a.data.length >= b.data.length ? a : b));

  longestSeries.data.forEach((dp, i) => {
    const point: Record<string, unknown> = { date: dp.date };
    series.forEach((s) => {
      const avg = s.data.reduce((sum, d) => sum + d.value, 0) / s.data.length;
      const val = s.data[i]?.value;
      if (val !== undefined) {
        point[s.sourceId] = Math.round(((val - avg) / avg) * 10000) / 100;
      }
    });
    combinedData.push(point);
  });

  return (
    <div className="rounded-lg border border-border/50 bg-card p-4">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={combinedData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v > 0 ? "+" : ""}${v}%`}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value: number) => `${value > 0 ? "+" : ""}${value}%`}
          />
          <Legend
            wrapperStyle={{ fontSize: 11 }}
            formatter={(value) => {
              const s = series.find((s) => s.sourceId === value);
              return s ? `${s.label} (${s.unit})` : value;
            }}
          />
          {showEvents &&
            events.map((evt) => (
              <ReferenceLine
                key={evt.id}
                x={evt.date.replace(", 2026", "")}
                stroke="hsl(var(--primary))"
                strokeDasharray="4 4"
                strokeWidth={1}
              />
            ))}
          {series.map((s) => (
            <Line
              key={s.sourceId}
              type="monotone"
              dataKey={s.sourceId}
              stroke={s.color}
              strokeWidth={2}
              dot={{ r: 2, fill: s.color }}
              activeDot={{ r: 4 }}
              name={s.sourceId}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalysisCharts;
