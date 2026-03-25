import { format, subDays, startOfWeek, addDays, parseISO } from 'date-fns';

interface HeatMapProps {
  completions: string[];
  weeks?: number;
}

// Heat map colors based on completion count
const getHeatColor = (count: number): string => {
  if (count === 0) return '#E2E8F0'; // Gray - no record
  if (count <= 2) return '#BBF7D0'; // Light green
  if (count <= 4) return '#86EFAC'; // Medium green
  return '#22C55E'; // Dark green
};

const HeatMap: React.FC<HeatMapProps> = ({ completions, weeks = 13 }) => {
  // Generate dates for the heat map (7 columns x N weeks)
  const today = new Date();
  const startDate = startOfWeek(subDays(today, weeks * 7 - 1), { weekStartsOn: 0 });

  // Create a map of date strings to completion counts
  const completionMap = new Map<string, number>();
  completions.forEach(c => {
    const dateStr = format(parseISO(c), 'yyyy-MM-dd');
    completionMap.set(dateStr, (completionMap.get(dateStr) || 0) + 1);
  });

  // Generate grid data
  const days: { date: Date; count: number }[] = [];
  for (let i = 0; i < weeks * 7; i++) {
    const date = addDays(startDate, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const count = completionMap.get(dateStr) || 0;
    days.push({ date, count });
  }

  // Group by weeks
  const weekGroups: { date: Date; count: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weekGroups.push(days.slice(i, i + 7));
  }

  // Day labels
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="heat-map-container">
      {/* Day labels */}
      <div className="flex flex-col gap-[2px] mr-2">
        {dayLabels.map((label, i) => (
          <div
            key={label}
            className="h-3 text-[10px] text-gray-500 flex items-center"
            style={{ visibility: i % 2 === 1 ? 'visible' : 'hidden' }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="flex gap-[2px] overflow-x-auto">
        {weekGroups.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[2px]">
            {week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className="w-3 h-3 rounded-sm cursor-pointer transition-transform hover:scale-125"
                style={{ backgroundColor: getHeatColor(day.count) }}
                title={`${format(day.date, 'yyyy-MM-dd')}: ${day.count} completion${day.count !== 1 ? 's' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
        <span>Less</span>
        <div className="flex gap-[2px]">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#E2E8F0' }} />
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#BBF7D0' }} />
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#86EFAC' }} />
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#22C55E' }} />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default HeatMap;