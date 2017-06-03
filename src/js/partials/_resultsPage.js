import $ from 'jquery';


export default function resultsPage(response) {
	$('.loading').addClass('is-not-displayed');
	$('.results-page').removeClass('is-not-displayed');

	var oysterWeekly = response.oyster.weeklyValue.toFixed(2);
	var oysterMonthly = null;
	if(response.oyster.monthlyValue) {
		oysterMonthly = response.oyster.monthlyValue.toFixed(2);
	} else {
		oysterMonthly = oysterWeekly;
	}

	$('.contactless__price').html(oysterWeekly);
	$('.oyster__weekly-price').html(oysterWeekly);
	$('.oyster__monthly-price').html(oysterMonthly);
	$('.results__oyster-card').html(response.oysterCard);

	if (response.discountCard === '16-25 Railcard' || response.discountCard === 'Senior Railcard') {
		$('.results__oyster-discount').html('  +  ' + response.discountCard);
	} else if (response.discountCard !== 'None') {
		$('.results__oyster-discount').html('  +  ' + response.discountCard + ' Discount Card');
	}


	if(response.oyster.cap !== 'noCap'){
		$('.oyster-travelcard').html('a ' + response.oyster.cap);
	}

	$('.edit-journeys').click(function(e){
		e.preventDefault();
		$('.js-form').removeClass('is-not-displayed');
		$('.results-page').addClass('is-not-displayed');
		$('.edit-journeys').addClass('is-not-displayed');
	});
}