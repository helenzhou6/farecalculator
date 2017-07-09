import $ from 'jquery';
import debounce from 'lodash/debounce';
import Fuse from 'fuse.js';
import getData from './../utility/_getData';

export default function autocomplete($form) {
  let stationFuse;

  // FUNCTIONS
  const handleFocus = (e, show) => {
    const $target = $(e.currentTarget);
    const $journey = $target.closest('.js-journey');

    $journey.find('.journey__input').removeClass('journey__input--has-error');

    hideResults($journey, show);
  };

  const handleKeyPress = (e) => {
    const charCode = e.keyCode ? e.keyCode : e.which;

    // Only run the rest if it's one of our three keys
    const acceptableKeys = [38, 27, 40, 13];
    if (acceptableKeys.indexOf(charCode) === -1) return;

    const $input = $(e.currentTarget);
    const $journey = $input.closest('.js-journey');
    const $currentlySelected = $journey.find('.result--is-active');

    // TO DO: simplify the function (duplication)

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
      default:
        break;
    }
  };

  const handleMouseover = (e) => {
    const $result = $(e.currentTarget);
    const $journey = $result.closest('.js-journey');
    const $currentlySelected = $journey.find('.result--is-active');
    $currentlySelected.removeClass('result--is-active');
    $result.addClass('result--is-active');
  };

  const fillResult = ($target, moveOn) => {
    // const $target = $(e.currentTarget);
    const stationName = $target.find('.js-result__name').text();
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

  // DISPLAYING THE RESULTS of the station autocomplete
  const clearResults = ($journey) => {
    $journey.find('.js-completion-results').remove();
  };

  const hideResults = ($journey, hide) => {
    $journey.find('.js-completion-results')[hide ? 'addClass' : 'removeClass']('hide');

    // Restore value from data attribute
    const $input = $journey.find('.js-autocomplete-station');
    $input.val($input.attr('data-val'));
  };

  const buildResults = (() => {
    const $resultTemplate = $($.parseHTML($.trim($('.js-autocomplete-template').html())));

    return (matches) => {
      const $container = $('<div class="js-completion-results completion-results"></div>');

      matches.forEach((match) => {
        const $result = $resultTemplate.clone();
        const $resultName = $result.find('.js-result__name');

        $resultName.html(match.name);
        $container.append($result);
      });

      return $container;
    };
  })();

  const initFuse = () => {
    if (stationFuse) return Promise.resolve();

    return getData.stationsByNaptan()
      .then((resp) => {
        stationFuse = new Fuse(resp, {
          keys: ['name'],
        });

        return Promise.resolve();
      });
  };

  const updateResults = (e) => {
    const $target = $(e.currentTarget);
    const $journey = $target.closest('.js-journey');
    const val = $target.val();

    // Set the val so we can 'restore' it later
    $target.attr('data-val', val);

    if (val.length > 2) {
      initFuse().then(() => {

        const matches = stationFuse.search(val).slice(0, 5);

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

  const bindUIEvents = () => {
    // Load autocomplete results
    $form.on('input', '.js-autocomplete-station', debounce(updateResults, 200));
    $form.on('blur', '.js-autocomplete-station', e => handleFocus(e, true));
    $form.on('focus', '.js-autocomplete-station', e => handleFocus(e, false));
    $form.on('mouseover', '.js-result', e => handleMouseover(e));
    $form.on('keydown', '.js-autocomplete-station', handleKeyPress);

    // Populate
    // -- TO DO: Mousedown the best way? Click fires too late and conflicts with blur
    // http://stackoverflow.com/questions/19079264/blur-event-is-triggered-instead-of-click
    $form.on('mousedown', '.js-result', (e) => {
      e.preventDefault();
      fillResult($(e.currentTarget), true);
    });
  };

  bindUIEvents();
}
