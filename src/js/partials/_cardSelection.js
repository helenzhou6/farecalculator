// OYSTER AND DISCOUNT CARD SELECTION
// The UI to now allow certain oyster cards with other discount cards
import $ from 'jquery';

export default function cardSelection() {
  // Caches the DOM elements
  const $discountCard = $('.js-discount-card-select');
  const $discountCardInput = $('#discount-card');
  const $oysterCard = $('.js-oyster-card-select');
  const $childOysterCard = $oysterCard.find('option[value="child-jobless"]');
  const $childDiscountCard = $discountCard.find('option[value="child-jobless"]');
  const $studentOysterCard = $oysterCard.find('option[value="student"]');

  // Removes any existing elements disabled
  const removeDisabled = function(card, $this) {
    card.find('option:disabled').prop('disabled', '');
  }

  $('.js-oyster-card-select').change(function() {
    const selectedOyster = $(this).find("option:selected").val();
    removeDisabled($discountCard);
    $discountCardInput.prop('disabled', false);
    $discountCard.removeClass('is-disabled');
    if (selectedOyster === 'student') {
      $childDiscountCard.prop('disabled', true);
    } else if (selectedOyster === 'child-jobless') {
      $discountCardInput.prop('disabled', true);
      $discountCard.addClass('is-disabled');
    }
	});

  $('.js-discount-card-select').change(function() {
    const selectedDiscount = $(this).find("option:selected").val();
    removeDisabled($oysterCard);
    if (selectedDiscount === 'railcard') {
      $childOysterCard.prop('disabled', true);
    } else if (selectedDiscount === 'child-jobless') {
      $studentOysterCard.prop('disabled', true);
      $childOysterCard.prop('disabled', true);
    } else if (selectedDiscount === 'disabled') {
      $childOysterCard.prop('disabled', true);
    }
  });
}
