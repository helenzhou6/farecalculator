import oyster from './_oyster';
 import { getFare,
 			round, } from './../utility/_utility';

export default function oysterMonthly(days, data) {
	if (oyster(days, data).cap !== "noCap") {
		const monthly = getFare([oyster(days, data).cap], false, data.monthlyCaps);
		const weekly = (monthly * 12)/52;
		return round(weekly, 2);
	}
};