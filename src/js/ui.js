import $ from 'jquery';

export default function ui(){	

	$(document).ready(function() {
		const maxJourneys = 3;
		const $days = $('.js-day');

		var addJourney = (function() {
			const $dayTemplate = $($.parseHTML($.trim($('.js-journey').html())));

			return function ($journeys) {
				const $newTemplate = $dayTemplate.clone();
				$newTemplate.attr('data-day', $journeys.data('day'));
				$newTemplate.appendTo($journeys);
			};
		}());

		var countJourneys = function($day) {
			return $day.find('.js-day__journey').length;
		};

		var numberFields = function($form) {
			const $journeys = $days.find('.js-day__journey');

			$journeys.each((journeyNum, journey) => {
				const $journey = $(journey);
				const $inputs = $journey.find('input, select');
				const dataDay = $journey.data('day');

				$inputs.each((inputNum, input) => {
					const $input = $(input);
					const name = $input.data('name');
	
					if (!name) return;
	
					$input.attr('name', dataDay + '-' + (journeyNum + 1) + '-' + name);
				});
			});
		};

		$days.each((i, day) => {
			const $day = $(day);
			const $addBtn = $day.find('.js-add-journey');
			const $journeys = $day.find('.js-day__journeys');

			// Add a journey
			$day.on('click', '.js-add-journey', (e) => {
				e.preventDefault();

				// How many would there be if we added one?
				const nextCount = countJourneys($day) + 1;

				// Have we reached the max?
				if (nextCount <= maxJourneys) {

					// Nope, add a journey
					addJourney($journeys);

					// If we're on the cuttoff, disable the button
					if (nextCount === maxJourneys) {
						$addBtn.attr('disabled', true);
					}
				}

				// numberFields($('form'));
			});

			// Remove a journey
			$day.on('click', '.js-remove-journey', (e) => {
				e.preventDefault();
				$(e.currentTarget).closest('.js-day__journey').remove();

				// How many journeys are there?
				const count = countJourneys($day);

				// If we're not full, re-enable the add button
				if (count < maxJourneys) {
					$addBtn.attr('disabled', false);
				}

				// numberFields($('form'));
			});
		});
	});

}