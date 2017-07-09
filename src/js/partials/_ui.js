import $ from 'jquery';
import debounce from 'lodash/debounce';
import Fuse from 'fuse.js';
import glue from './_glue.js';
import loading from './_loading';
import resultsPage from './_resultsPage';
import cardSelection from './_cardSelection';
import getData from './../utility/_getData';

let stationResults = null;
let stationFuse = null;

// TO DO: Refactor labels to not contain Divs

export default function ui() {

  $(document).ready(function() {
		cardSelection();

		// JAVASCRIPT ADDS/REMOVES JOURNEYS
    const maxJourneys = 6;
    const $days = $('.js-day');
    const $errorBox = $('.js-errors');

		const removeJourney = function ($journey) {
			checkNoJourneys($journey.closest('.js-day'));
			$journey.remove();
		};

    const addJourney = (function() {
      const $dayTemplate = $($.parseHTML($.trim($('.js-journey-template').html())));

      return function($journeys, dayType, focus) {
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
        // TO DO: Should we strucutre this to append to journey input?
        // $journeys.find('.journey__input');
        $newTemplate.appendTo($journeys);
				if(focus) {
					// Focus the first element
	        $newTemplate.find('input').first().focus();
				}
      };
    }());

    const countDayJourneys = function($day) {
      return $day.find('.js-day__journey').length;
    };

    const countAllJourneys = function() {
      return $('.js-day__journey').length;
    };

    const removeEmptyJourneys = function() {
      const $journeys = $('.js-day__journey');

      $journeys.each((i, journey) => {
        const $journey = $(journey);
        const $from = $journey.find('input[data-name="from"]');
        const $to = $journey.find('input[data-name="to"]');

        if (!$from.val() && !$to.val()) {
          removeJourney($journey);
        }
      });
    };

		// error handling
    const addGlobalError = function(message) {
      $errorBox.html(`<p class="errors__text">${message}</p>`);
    };

		const markError = function($journeyInput, hasError) {
			$journeyInput[hasError ? 'addClass' : 'removeClass']('journey__input--has-error');
		};

		const removeErrors = function() {
			$errorBox.html('');
			$('.js-day__journey-errors').remove();
		};

    const processJourneys = function($form) {
      const data = [];

      // A flag so we can check at the end if there have been any errors
      let hasErrors = false;

      // Handles an error during a journey
      function journeyError($journeyInput, message, errorArray) {
        // Sets the global flag
        hasErrors = true;
        // Marks the input as having an error
        markError($journeyInput, true);
        // Adds the error message to the journey array
        errorArray.push(message);
        // Return true so we can just return journeyError to break the loop
        return true;
      }

      return loadResults().then(() => {
        $days.each((i, day) => {
          const dayData = [];
          const $journeys = $(day).find('.js-day__journey');

          $journeys.each((journeyNum, journey) => {
            const $journey = $(journey);
            const $inputs = $journey.find('input, select');

            // const dataDay = $journey.data('day');

            const journeyData = {};

            // An array of all the errors produced during the journey processing
            const journeyErrors = [];

            const $from = $journey.find('input[data-name="from"]');
            const $to = $journey.find('input[data-name="to"]');

            if ($from.val() === $to.val()) {
              journeyError($journey.find('.journey__input'), 'Stations cannot be the same.', journeyErrors);
            }

            $inputs.each((inputNum, input) => {
              const $input = $(input);
              const name = $input.data('name');
              const val = $input.val();

              // If the input is empty...
              if (!val) {
                return journeyError($input.closest('.journey__input'), 'Looks like an incomplete journey.', journeyErrors);
              }

              if ($input.hasClass('js-autocomplete-station')) {
                const station = stationResults.find(station => station.name === val);

                // If we can't find the matching station...
                if (!station) {
                  // ...add an error and return true to break to the next loop
                  return journeyError($input.closest('.journey__input'), `'${val}' is not a valid station name.`, journeyErrors);
                }

                journeyData[name] = station.ics;
              } else {
                journeyData[name] = val;
              }
            });

            // If we have errors for the journey
            if (journeyErrors.length) {
              // Remove duplicates
              const filteredErrors = journeyErrors.filter((message, i) => (
                journeyErrors.indexOf(message) === i
              ));

              addErrorBox($journey, filteredErrors);

            }

            dayData.push(journeyData);
          });

          data.push(dayData);
        });

        // If we had any errors, return null, otherwise return the data
        return hasErrors ? null : data;
      });

    };

    const checkNoJourneys = function ($day) {
      // How many journeys are there?
      const count = countDayJourneys($day);
      // If we're not full, re-enable the add button
      if (count <= maxJourneys) {
        $day.find('.js-add-journey').attr('disabled', false);
      }
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
        const nextCount = countDayJourneys($day) + 1;

        // Have we reached the max?
        if (nextCount <= maxJourneys) {
          // Nope, add a journey
          addJourney($journeys, dayType, true);

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
        removeJourney($(e.currentTarget).closest('.js-day__journey'));
      });
    });

    // var updateAddBtnVisibility = function() {
    //
    // };

    // Form submit
    const $form = $('.js-form');

    $form.on('submit', (e) => {
      try {
        e.preventDefault();

        // Remove any existing errors
        removeErrors();

        loading(true);

        // Clear out any empty journeys
        removeEmptyJourneys();

        // If we have no journeys at all
        if (!countAllJourneys()) {
          addGlobalError('Oops, it looks like you havent entered any journeys.');
          $(window).scrollTop(0);
          loading(false);

          // Don't bother continuing
          return;
        }

        const journeyPromise = processJourneys($form);

        journeyPromise.then((journeys) => {
          // journeyPromise will return null if there was an error
          if (!journeys) {
            addGlobalError('There are issues with your form, please scroll for details.');
            $(window).scrollTop(0);
            // If there was an error, hide the loading screen
            loading(false);
            // And exit out, as we have no data to process
            return;
          }

          // Re-number the fields
          const data = {
            oysterCard: {
              label: $form.find('[name="oyster-card"] option:selected').text(),
              val: $form.find('[name="oyster-card"]').val(),
            },
            discountCard: {
              label: $form.find('[name="discount-card"] option:selected').text(),
              val: $form.find('[name="discount-card"]').val(),
            },
            journeys,
          };

          glue(data).then(response => {
            if (response.errors.length) {
              console.log(response.errors);
              showForm();

              response.errors.forEach(error => {

                const $daysWithJourneys = $('.js-day').filter((i, jsday) => {
                  return countDayJourneys($(jsday)) > 0;
                });


                const $errorDay = $($daysWithJourneys[error.dayNum]);
                const $errorJourney = $($errorDay.find('.js-day__journey')[error.journeyNum]);

                if ($errorJourney.length > -1) {
                  addErrorBox($errorJourney, [error.desc]);

                  $errorJourney.find('.journey__input').each((i, input) => {
                    markError($(input), true);
                  });
                }
              });
            } else {
              resultsPage(response);
            }

            // response
            console.log('THIS IS THE RESP:', JSON.stringify(response));
          })

          // Get the form data as an array of Objects
          // const data = $(e.target).serializeArray();
        }).catch(handleGenericError);
      } catch (e) {
        handleGenericError(e);
      }
    });

		// DISPLAYING THE RESULTS of the station autocomplete
    const clearResults = function($journey) {
      $journey.find('.js-completion-results').remove();
    };

    const hideResults = function($journey, hide) {
      $journey.find('.js-completion-results')[hide ? 'addClass' : 'removeClass']('hide');

      // Restore value from data attribute
      const $input = $journey.find('.js-autocomplete-station');
      $input.val($input.attr('data-val'));
    };

    const buildResults = (function() {
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

    const loadResults = function() {
      if (stationResults) return Promise.resolve();

      return getData.stations()
        .then(resp => {
          stationResults = Object.keys(resp).map(naptan => resp[naptan]);

          stationFuse = new Fuse(stationResults, {
            keys: ['name']
          });

          return Promise.resolve();
        });
    };

    const updateResults = function(e) {
      const $target = $(e.currentTarget);
      const $journey = $target.closest('.js-journey');
      const val = $target.val();

      // Set the val so we can 'restore' it later
      $target.attr('data-val', val);

      if (val.length > 2) {
        loadResults().then(() => {

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

    const addErrorBox = function($elem, errors) {
      $elem.prepend(`
				<div class="js-day__journey-errors errors__text">
						<ul>
							${errors.map(error => `<li>${error}</li>`).join('')}
						</ul>
				</div>
			`);
    };

    const showForm = function (){
      $(window).scrollTop(0);
      $('.js-form').removeClass('is-not-displayed');
      $('.results-page').addClass('is-not-displayed');
      $('.edit-journeys').addClass('is-not-displayed');
      $('.loading').addClass('is-not-displayed');
    };

    const handleGenericError = (function() {
      const defaultMessage = 'Looks like there was a problem... shoot me an <a href="mailto:helen.zhou6@gmail.com">email</a>?';

      return function(e) {
        console.error(e);
        addGlobalError(e ? e.message : defaultMessage);
        showForm();
      };
    }());

    const handleFocus = function(e, show) {
      const $target = $(e.currentTarget);
      const $journey = $target.closest('.js-journey');

      $journey.find('.journey__input').removeClass('journey__input--has-error');

      hideResults($journey, show);
    };

    const handleKeyPress = function(e) {
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
      }
    };

    const handleMouseover = function(e) {
      const $result = $(e.currentTarget);
      const $journey = $result.closest('.js-journey');
      const $currentlySelected = $journey.find('.result--is-active');
      $currentlySelected.removeClass('result--is-active');
      $result.addClass('result--is-active');
    };

    const fillResult = function($target, moveOn) {
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

		$('.edit-journeys').click(function(e) {
			e.preventDefault();
			showForm();
		});
	});
}
