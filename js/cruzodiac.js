(function(window, $, undefined) {
	var app = window.Cruzodiac || (window.Cruzodiac = {});
	var $window = $(window);

	var currentPosition = 0;
	var targetPosition = 0;
	var browserWidth = 0;

	var loadedImages = 0;

	var autorun = function() {

		$("#cruzodiacimage1").one('load', function() {
			imageLoaded();
		}).each(function() {
			if(this.complete) $(this).load();
		});

		$("#cruzodiacimage2").one('load', function() {
			imageLoaded();
		}).each(function() {
			if(this.complete) $(this).load();
		});

		$("#cruzodiacimage3").one('load', function() {
			imageLoaded();
		}).each(function() {
			if(this.complete) $(this).load();
		});

		$("#cruzodiacimage4").one('load', function() {
			imageLoaded();
		}).each(function() {
			if(this.complete) $(this).load();
		});

		$("#cruzodiacimage1").attr("src", "img/cruzodiac/cruzodiac1.png");
		$("#cruzodiacimage2").attr("src", "img/cruzodiac/cruzodiac2.png");
		$("#cruzodiacimage3").attr("src", "img/cruzodiac/cruzodiac3.png");
		$("#cruzodiacimage4").attr("src", "img/cruzodiac/cruzodiac4.png");

	};

	var imageLoaded = function() {
		loadedImages++;

		if (loadedImages == 4) {
			$("#loader").animate({ opacity: 0 }, 500, "linear", function() {
				$("#loader").css("display","none");
			});
			setTimeout(function() {
				$("#allimages").css("display","block");
				$("#allimages").animate({ opacity: 1 }, 3000, "linear");
				if (isTouchDevice()) {
					setTimeout(function() {
						$("#introtext").css("display","block");
						$("#introtext").html("Drag your finger across the screen to reveal!");
						$("#introtext").css("display","block");
						$("#introtext").animate({ opacity: 1 }, 2000, "linear");

						setTimeout(function() {
							$("#introtext").animate({ opacity: 0 }, 2000, "linear", function() {
								$("#introtext").css("display","none");
							});
						}, 3000);
					}, 1000);
				}

				startReveal();
			}, 500);
		}
	};

	var startReveal = function() {
		browserWidth = $(window).width();

		setInterval(function() {
			currentPosition += (targetPosition - currentPosition) / 4;
			var currentReveal = currentPosition / 640 * 79;
			currentReveal = Math.min(79, Math.max(0,currentReveal));
			var pos = Math.round(currentReveal) * -640;

			$("#allimages").css("left", pos);
		}, 30);

		$("body").bind('mousemove', function(e) {
			// $('#status').html(e.pageX +', '+ e.pageY);
			targetPosition = 640 - Math.max(0, Math.min(640, e.pageX - $('#cruzodiaccontainer').offset().left));
			//targetPosition = browserWidth - (e.pageX - $('#cruzodiaccontainer').offset().left);
			// console.log(targetPosition);
			$("#bugger").html(targetPosition);
		});

		$("body").bind('touchmove', function(e) {
			e.preventDefault();
			var touch = event.targetTouches[event.targetTouches.length-1];
			$("#bugger").html("TOUCH: " + touch.pageX + ", " + event.targetTouches.length);
			targetPosition = browserWidth - touch.pageX;
		});

		$(window).resize(function() {
			browserWidth = $(window).width();
		});
	};

	var isTouchDevice = function() {
		var el = document.createElement('div');
		el.setAttribute('ongesturestart', 'return;');
		return typeof el.ongesturestart === "function";
	};

	// On DOM ready
	$(autorun);

})(this, jQuery);
