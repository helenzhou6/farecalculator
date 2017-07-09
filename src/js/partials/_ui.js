import $ from 'jquery';
import glue from './_glue.js';
import loading from './_loading';
import resultsPage from './_resultsPage';
import cardSelection from './_cardSelection';
import getData from './../utility/_getData';
import autocomplete from './_autocomplete';
import showForm from './_showForm';

// TO DO: Refactor labels to not contain Divs

export default function ui() {

  $(document).ready(function() {

    // INIT
    $('body').removeClass('is-invisible');
    cardSelection();
    const $form = $('.js-form');
    autocomplete($form);

    // ADDS/REMOVES JOURNEYS
    const maxJourneys = 6;
    const $days = $('.js-day');
    const $errorBox = $('.js-errors');

    const removeJourney = function($journey) {
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
        if (focus) {
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

    const checkNoJourneys = function($day) {
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

      // TO DO: uncomment
      // Pre-populate with an empty journey
      addJourney($journeys, dayType);

      // ADD A JOURNEY
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
      });

      // REMOVE JOURNEYS
      $day.on('click', '.js-remove-journey', (e) => {
        e.preventDefault();
        removeJourney($(e.currentTarget).closest('.js-day__journey'));
      });
    });

    // ERROR HANDLING
    const addErrorBox = function($elem, errors) {
      $elem.prepend(`
				<div class="js-day__journey-errors errors__text">
						<ul>
							${errors.map(error => `<li>${error}</li>`).join('')}
						</ul>
				</div>
			`);
    };

    const handleGenericError = (function() {
      const defaultMessage = 'Looks like there was a problem... shoot me an <a href="mailto:helen.zhou6@gmail.com">email</a>?';

      return function(e) {
        console.error(e);
        addGlobalError(e ? e.message : defaultMessage);
        showForm();
      };
    }());

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
      // LOAD RESULTS?
      return getData.stationsByNaptan().then((stationResults) => {
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

    // FORM SUBMIT
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

    $('.edit-journeys').click(function(e) {
      e.preventDefault();
      showForm();
    });
  });
}
