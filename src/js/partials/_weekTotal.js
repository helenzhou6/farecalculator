import oysterDayTotal from './_oysterDayTotal';
import conDayTotal from './_contactlessDayTotal';

export default function weekTotal(paymentFunction, days, info) {
  return days.map((day) => paymentFunction(day, info.options, info.data)).reduce((a, b) => a + b);
	// if l is a daily off peak cap between 1-4, 1-5 or 1-6, for > 2x a week, then refund
	  // week function to see if off peak cap met and max zone between 4-6: if true for 2+ a week, apply a discount
}