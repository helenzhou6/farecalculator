import $ from 'jquery';


export default function loading() {
	$('.js-form').addClass('is-not-displayed');
	$('.loading').removeClass('is-not-displayed');
	$('.edit-journeys').removeClass('is-not-displayed');
}