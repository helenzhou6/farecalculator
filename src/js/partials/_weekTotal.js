import oysterDayTotal from './_oysterDayTotal';
import conDayTotal from './_contactlessDayTotal';

export default function weekTotal(paymentFunction, days, info) {
  return days.map((day) => paymentFunction(day, info.options, info.data)).reduce((a, b) => a + b);
}