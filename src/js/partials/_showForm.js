import $ from 'jquery';

const $window = $(window);
const $form = $('.js-form');
const $resultsPage = $('.results-page');
const $editJourney = $('.edit-journeys');
const $loading = $('.loading');

export default function showForm() {
  $window.scrollTop(0);
  $form.removeClass('is-not-displayed');
  $resultsPage.addClass('is-not-displayed');
  $editJourney.addClass('is-not-displayed');
  $loading.addClass('is-not-displayed');
}
