// Makes a new date based on todays date
// Turns todays date into the 1st of 2 months in the future
// --> Sets the date to the nearest friday

export default function dateGen() {

	// Adds padding if single digit
	function padding(digit) {
	  if (digit < 10){
	    return '0' + digit;
	  } else {
	    return digit.toString();
	  }
	}

	  var date = new Date();

	  // Adds two months to todays date
	  date.setMonth(date.getMonth() + 2);
	  // Fixes off by one month output
	  var month = padding(date.getMonth() + 1);

	  // Sets the new date as the 1st
	  date.setDate(1);

	  // Gets the day of todays date, where 0 = sunday, friday = 5 etc
	  // Gets the difference between this day and the nearest Friday
	  // Sets the new date as the nearest Friday to the new date
	  // -- in 2021 there is a Good Friday in the beginning of April
	  date.setDate(date.getDate() + (5 - date.getDay()));
	  var day = padding(date.getDate());

	  // Year - makes into a string
	  var year = date.getFullYear().toString();

	  //yyyyMMdd format needed
	  return year + month + day;
}
