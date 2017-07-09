import $ from 'jquery';

export default function showForm() {
	$(window).scrollTop(0);
	$('.js-form').removeClass('is-not-displayed');
	$('.results-page').addClass('is-not-displayed');
	$('.edit-journeys').addClass('is-not-displayed');
	$('.loading').addClass('is-not-displayed');
}
