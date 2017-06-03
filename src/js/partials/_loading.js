import $ from 'jquery';

export default function loading(isLoading) {
	$('.js-form')[isLoading ? 'addClass' : 'removeClass']('is-not-displayed');
	$('.loading')[isLoading ? 'removeClass' : 'addClass']('is-not-displayed');
	$('.edit-journeys')[isLoading ? 'removeClass' : 'addClass']('is-not-displayed');
}