import $ from 'jquery';
import debounce from 'lodash/debounce';

// TODO: Refactor labels to not contain Divs

export default function ui() {

  $(document).ready(function () {
    const maxJourneys = 3;
    const $days = $('.js-day');

    var addJourney = (function () {
      const $dayTemplate = $($.parseHTML($.trim($('.js-journey-template').html())));

      return function ($journeys, dayType) {
        const $newTemplate = $dayTemplate.clone();
        const $ifs = $newTemplate.find('[data-if]');
        $newTemplate.attr('data-day', $journeys.data('day'));

        $ifs.each((i, elem) => {
          const $elem = $(elem);
          const ifVal = $elem.attr('data-if');

          if (ifVal !== dayType) {
            $elem.remove();
          }
        });

        // Add to the DOM
        $newTemplate.appendTo($journeys);

        // Focus the first element
        $newTemplate.find('input').first().focus();
      };
    }());

    var countJourneys = function ($day) {
      return $day.find('.js-day__journey').length;
    };

    var numberFields = function ($form) {
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
      const dayType = $day.attr('data-day');

      // TODO: uncomment
      // Pre-populate with an empty journey
      addJourney($journeys, dayType);

      // Add a journey
      $day.on('click', '.js-add-journey', (e) => {
        e.preventDefault();

        // How many would there be if we added one?
        const nextCount = countJourneys($day) + 1;

        // Have we reached the max?
        if (nextCount <= maxJourneys) {
          // Nope, add a journey
          addJourney($journeys, dayType);

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
      });
    });

    // Form submit
    const $form = $('.js-form');

    $form.on('submit', (e) => {
      e.preventDefault();

      // Re-number the fields
      numberFields($form);

      // Get the form data as an array of Objects
      const data = $(e.target).serializeArray();
    });

    // Station autocomplete
    // https://api.tfl.gov.uk/Stoppoint/Search/Bow?modes=tube,dlr

    var clearResults = function($journey) {
      $journey.find('.js-completion-results').remove();
    };

    var hideResults = function($journey, hide) {
      $journey.find('.js-completion-results')[hide ? 'addClass' : 'removeClass']('hide');
    };

    var buildResults = (function() {
      const $resultTemplate = $($.parseHTML($.trim($('.js-autocomplete-template').html())));

      return (matches) => {
        const $container = $('<div class="js-completion-results"></div>');

        matches.forEach((match) => {
          const $result = $resultTemplate.clone();
          const $resultName = $result.find('.js-result__name');

          // TODO: Add mode, but must filter out the Bus
          $resultName.html(match.name);

          $container.append($result);
        });

        return $container;
      };
    })();

    var updateResults = function(e) {
      const $target = $(e.currentTarget);
      const $journey = $target.closest('.js-journey');
      const val = $target.val();

      if (val.length > 2) {
        $.ajax(`https://api.tfl.gov.uk/Stoppoint/Search/${val}?modes=tube,dlr`, {
          beforeSend: () => {
            // TODO: Spinner?
            console.log('sending...');
          },
        }).done((result) => {
          console.log('recieved');

          // TODO have the API limit results
          const matches = result.matches.slice(0, 3);

          const $results = buildResults(matches);

          // Clear old results
          clearResults($journey);

          // Append the built results to the parent
          $journey.append($results);

        });
      } else {
        // Clear old results
        clearResults($journey);
      }
    };

    var handleFocus = function(e, show) {
      const $target = $(e.currentTarget);
      const $journey = $target.closest('.js-journey');

      hideResults($journey, show);
    };

    // Load autocomplete results
    $form.on('input', '.js-autocomplete-station', debounce(updateResults, 200));
    $form.on('blur', '.js-autocomplete-station', e => handleFocus(e, true));
    $form.on('focus', '.js-autocomplete-station', e => handleFocus(e, false));

    var fillResult = function(e) {
      e.preventDefault();

      const $target = $(e.currentTarget);
      const stationName = $target.find('.js-result__name').html();
      const $journey = $target.closest('.js-journey');
      const $input = $journey.find('.js-autocomplete-station');

      // Populate textbox
      $input.val(stationName);

      // Remove autocomplete menu
      clearResults($journey);

      // Focus the next input, if available
      const $dayJourney = $journey.closest('.js-day__journey');
      const $inputs = $dayJourney.find('input, select');

      // Find out the position of the current input within all the inputs
      const pos = $inputs.index($input);

      // If there is an applicable input after this one, focus it
      if ($inputs[pos + 1]) {
        $inputs[pos + 1].focus();
      } else {
        // Otherwise just blur
        $input.blur();
      }
    };

    // Populate
    // TODO: Mousedown the best way? Click fires too late and conflicts with blur
    // http://stackoverflow.com/questions/19079264/blur-event-is-triggered-instead-of-click
    $form.on('mousedown', '.js-result', fillResult);
  });
}
