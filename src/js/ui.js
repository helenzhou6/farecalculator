import $ from 'jquery';

export default function ui(){

	$(document).ready(function() {
		var $day = $('.day');

		$day.on('click', '.day-remove', function(e){ //on click of parent if this specific class inside parent is clicked, do this function
			e.preventDefault(); // prevents default page reload on click of a button
			$(this).closest('.day-journey').remove(); //make these things as specific as you can
		});

		$day.on('click', '.add-journey', function(e){
			e.preventDefault();

			var $closestday = $(this).closest('.day');
			var $dayjourney = $closestday.find('.day-journey').first();
			$dayjourney.after($dayjourney.clone());
		});
	});

}