(function ($) {
	"use strict";
	
	// JS Index
	//----------------------------------------
	// 1. preloader
	// 2. background image
	// 3. Animate the scroll to top
	// 4. Cats Filter
	// 4. Circular Bars - Knob
	// 5. accordion js
	// 9. vanta js 
	//-------------------------------------------------
 
	// 1. preloader
	//---------------------------------------------------------------------------
	$(window).load(function(){
	    $('#preloader').fadeOut('slow',function(){$(this).remove();});
	});
 
	// 2. background image
	//---------------------------------------------------------------------------
	$("[data-background]").each(function (){
	    $(this).css("background-image","url(" + $(this).attr("data-background") + ")");
	});
 
	// 3. Animate the scroll to top
    // --------------------------------------------------------------------------
    // Show or hide the sticky footer button
	$(window).on('scroll', function() {
		if($(this).scrollTop() > 100){
		$('#scroll').addClass('show');
		} else{
		$('#scroll').removeClass('show');
		}
	});

	$('#scroll').on('click', function(event) {
		event.preventDefault();
		
		$('html, body').animate({
		scrollTop: 0,
		}, 600);
	});
	




	// 4. Cats Filter
    // ---------------------------------------------------------------------------
	
	var $catsfilter = $('.cats-filter');

	// Copy categories to item classes
	$catsfilter.find('a').click(function() {
		var currentOption = $(this).attr('data-filter');
		$(this).parent().parent().find('a').removeClass('current');
		$(this).addClass('current');
	});	

 
	

    // 5. Circular Bars - Knob
    // ---------------------------------------------------------------------------

    	if (typeof ($.fn.knob) != 'undefined') {

		$('.knob').each(function () {
	
			var $this = $(this),
	
			knobVal = $this.attr('data-rel');
	
			$this.knob({
	
			'draw': function () {
		
					$(this.i).val(this.cv + '%');
		
			}
	
		});
 
		$this.appear(function () {
	
		$({
	
				value: 0
	
		}).animate({
	
				value: knobVal
	
		}, {
	
			duration: 2000,
	
			easing: 'swing',
	
			step: function () {
	
			$this.val(Math.ceil(this.value)).trigger('change');
	
			}
	
		});
 
			}, {
		
			accX: 0,
		
			accY: -150
		
			});
 
		});
 
 	};




	// 6. accordion js
    // ---------------------------------------------------------------------------
	$('.accordion-page-wrapper .collapse').collapse()


	// 9.  VANTA js
	//---------------------------------------------------------------------------
	VANTA.DOTS({
		el: "#venta-background",
		mouseControls: true,
		touchControls: true,
		gyroControls: false,
		backgroundColor: 0x0,
		color: 0xf26641,
	//   minHeight: 200.00,
	//   minWidth: 200.00,
		scale: 1.00,
		scaleMobile: 1.00,
		showLines: false
	});




 })(jQuery);