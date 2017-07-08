import $ from 'jquery';


export default function resultsPage(response) {

	// deals with the loading bar
	var $loadingBar = $('.loading-bar');
	var $innerMain = $loadingBar.find('.loading__inner--main');
	var $innerFinal = $loadingBar.find('.loading__inner--final');
  var transform = getComputedStyle($innerMain[0]).transform;
  $innerFinal.css({ transform: transform });
  $loadingBar.addClass('loading-bar--is-finished');

	// after loading bar animation completed
	setTimeout(function(){
		$('.loading').addClass('is-not-displayed');
		$('.results-page').removeClass('is-not-displayed');

		var oysterWeekly = response.oyster.weeklyCap.weeklyValue.toFixed(2);
		var oysterMonthly = response.oyster.monthlyCap.weeklyValue.toFixed(2);

		$('.contactless__price').html(oysterWeekly);
		$('.oyster__weekly-price').html(oysterWeekly);
		$('.oyster__monthly-price').html(oysterMonthly);
		$('.results__oyster-card').html(response.oysterCard);

		if (response.discountCard === '16-25 Railcard' || response.discountCard === 'Senior Railcard') {
			$('.results__oyster-discount').html('  +  ' + response.discountCard);
		} else if (response.discountCard !== 'None') {
			$('.results__oyster-discount').html('  +  ' + response.discountCard + ' Discount Card');
		}

		// if(response.oyster.weeklyCap.cap !== 'noCap'){
		// 	$('.oyster-weekly-travelcard').html('a ' + response.oyster.weeklyCap.cap);
		// }
		// if(response.oyster.monthlyCap.cap !== 'noCap'){
		// 	$('.oyster-monthly-travelcard').html('a ' + response.oyster.monthlyCap.cap);
		// }

		['weekly', 'monthly'].forEach(type => {
			if(response.oyster[`${type}Cap`].cap !== 'noCap'){
				$(`.oyster-${type}-travelcard`).html('a ' + response.oyster[`${type}Cap`].cap);
			}
		});

	}, 200);
}
