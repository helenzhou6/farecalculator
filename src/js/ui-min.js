$(document).ready(function(){var e=$(".day");e.on("click",".day-remove",function(e){e.preventDefault(),$(this).closest(".day-journey").remove()}),e.on("click",".add-journey",function(e){e.preventDefault();var n=$(this).closest(".day"),o=n.find(".day-journey").first();o.after(o.clone())})});