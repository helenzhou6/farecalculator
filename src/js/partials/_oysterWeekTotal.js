import oysterDayTotal from './_oysterDayTotal';

export default function oysterWeekTotal(days, info) {
  return days.map((day) => oysterDayTotal(day, info.options, info.data)).reduce((a, b) => a + b);
}