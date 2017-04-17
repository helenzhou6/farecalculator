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
        // TODO: Should we strucutre this to append to journey input?
        // $journeys.find('.journey__input');
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
        // console.log('remove!!!');
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

      // Restore value from data attribute
      const $input = $journey.find('.js-autocomplete-station');
      $input.val($input.attr('data-val'));
    };

    var buildResults = (function() {
      const $resultTemplate = $($.parseHTML($.trim($('.js-autocomplete-template').html())));

      return (matches) => {
        const $container = $('<div class="js-completion-results completion-results"></div>');

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

      // Set the val so we can 'restore' it later
      $target.attr('data-val', val);

      if (val.length > 2) {
        $.ajax(`https://api.tfl.gov.uk/Stoppoint/Search/${val}?modes=tube,dlr,overground`, {
          beforeSend: () => {
            $journey.addClass('journey__input--is-searching');
          },
        }).done((result) => {
          console.log('recieved');
          $journey.removeClass('journey__input--is-searching');

          // TODO have the API limit results
          const matches = result.matches.slice(0, 3);

          // Clear old results
          clearResults($journey);

          if (matches.length !== 0) {
            const $results = buildResults(matches);
            // Append the built results to the parent
            $journey.append($results);
          } 

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

    var handleKeyPress = function(e) {
      const charCode = e.keyCode ? e.keyCode : e.which;

      // Only run the rest if it's one of our three keys
      const acceptableKeys = [38, 27, 40, 13];
      if (acceptableKeys.indexOf(charCode) === -1) return;

      const $input = $(e.currentTarget);
      const $journey = $input.closest('.js-journey');
      const $currentlySelected = $journey.find('.result--is-active');

      // TODO: simplify the function (duplication)

      switch (charCode) {
        case 38:
          e.preventDefault();
          if ($currentlySelected.length !== 0) {
              const $previous = $currentlySelected.prev();
              $currentlySelected.removeClass('result--is-active');
              
              if ($previous.length !== 0) {
                $previous.addClass('result--is-active');
              } else {
                 $input.val($input.attr('data-val'));
              }
          } else {
              $journey.find('.js-result').last().addClass('result--is-active');
          }

          fillResult($journey.find('.result--is-active'), false);

          break;
        case 40:
          e.preventDefault();
          if ($currentlySelected.length !== 0) {
              const $next = $currentlySelected.next();
              $currentlySelected.removeClass('result--is-active');
              
              if ($next.length !== 0) {
                $next.addClass('result--is-active');
              } else {
                $journey.find('.js-result').first().addClass('result--is-active')
              }
          } else {
              $journey.find('.js-result').first().addClass('result--is-active');
          }

          fillResult($journey.find('.result--is-active'), false);

          break;

        case 13:
          e.preventDefault();
          fillResult($journey.find('.result--is-active'), true);
          break;
        case 27:
          e.preventDefault();
          hideResults($journey, true);
          break;
      }
    };

    // var selectResult = function($result) {
    //   $result.addClass('result--is-active');
    // };

    const handleMouseover = function(e) {
        const $result = $(e.currentTarget);
        const $journey = $result.closest('.js-journey');
        const $currentlySelected = $journey.find('.result--is-active');
        $currentlySelected.removeClass('result--is-active');
        $result.addClass('result--is-active');
    };

    var fillResult = function($target, moveOn) {
      // const $target = $(e.currentTarget);
      const stationName = $target.find('.js-result__name').html();
      const $journey = $target.closest('.js-journey');
      const $input = $journey.find('.js-autocomplete-station');

      // Populate textbox
      $input.val(stationName);

      if (moveOn) {
        $input.attr('data-val', stationName);

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
      }
 

    };

    // Load autocomplete results
    $form.on('input', '.js-autocomplete-station', debounce(updateResults, 200));
    $form.on('blur', '.js-autocomplete-station', e => handleFocus(e, true));
    $form.on('focus', '.js-autocomplete-station', e => handleFocus(e, false));
    $form.on('mouseover', '.js-result', e => handleMouseover(e));
    $form.on('keydown', '.js-autocomplete-station', handleKeyPress);

    // Populate
    // TODO: Mousedown the best way? Click fires too late and conflicts with blur
    // http://stackoverflow.com/questions/19079264/blur-event-is-triggered-instead-of-click
    $form.on('mousedown', '.js-result', (e) => {
      e.preventDefault();
      fillResult($(e.currentTarget), true);
    });
  });
}
