import $ from 'jquery';

export default function resultsPage(response) {
  // deals with the loading bar
  const $loadingBar = $('.loading-bar');
  const $innerMain = $loadingBar.find('.loading__inner--main');
  const $innerFinal = $loadingBar.find('.loading__inner--final');
  const transform = getComputedStyle($innerMain[0]).transform;
  const $resultOysterDiscount = $('.results__oyster-discount');
	const $spanAdd = $('.span-padding');
	const $resultsOysterDiscount = $('.results__oyster-discount');

  const updateDiscountTxt = (cardTxt) => {
    $resultOysterDiscount.html(`
        <img class="icon" src="src/img/discount-card.svg" />
        ${cardTxt}
    `);
  };

  $innerFinal.css({
    transform,
  });

  $loadingBar.addClass('loading-bar--is-finished');

  // after loading bar animation completed
  setTimeout(() => {
    $('.loading').addClass('is-not-displayed');
    $('.results-page').removeClass('is-not-displayed');

    const oysterWeekly = response.oyster.weeklyCap.weeklyValue.toFixed(2);
    const oysterMonthly = response.oyster.monthlyCap.weeklyValue.toFixed(2);

    $('.contactless__price').html(oysterWeekly);
    $('.oyster__weekly-price').html(oysterWeekly);
    $('.oyster__monthly-price').html(oysterMonthly);
    $('.results__oyster-card').html(`<img class="icon" src="src/img/oyster-card.svg" />${response.oysterCard} Oyster Card`);

    if (response.discountCard === '16-25 Railcard' || response.discountCard === 'Senior Railcard') {
      updateDiscountTxt(response.discountCard);
			$spanAdd.removeClass('hide');
			$resultsOysterDiscount.removeClass('hide');
    } else if (response.discountCard !== 'None') {
      updateDiscountTxt(`${response.discountCard} Discount Card`);
			$spanAdd.removeClass('hide');
			$resultsOysterDiscount.removeClass('hide');
    }

    ['weekly', 'monthly'].forEach((type) => {
      if (response.oyster[`${type}Cap`].cap !== 'noCap') {
        $(`.oyster-${type}-travelcard`).html(`a ${response.oyster[`${type}Cap`].cap}`);
      }
    });
  }, 200);
}
