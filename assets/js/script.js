

( function( $ ) {
	'use strict';
	
	/*
		Vars
	*/
	
	var width = $(window).width();
	var height = $(window).height();
	
	var header_offset_top = 15;

	if(width <= 540) {
		header_offset_top = 136;
	}
	
	/*
		Header Menu Desktop
	*/
	
	var container = $('.container');
	var card_items = $('.card-inner');
	var animation_in = container.data('animation-in');
	var animation_out = container.data('animation-out');
	var menu_items = $('.top-menu li');

	/*
		Preloader
	*/

	
	$('.carousel').carousel({
	    interval: 5000
	})
	
		/*----------------------------------------
      Portfolio Details carousel
 ----------------------------------------*/
  if ($('.port-details-slider').length) {
    $('.port-details-slider').owlCarousel({
      loop:true,
      margin:0,
      nav:false,
      autoplay: true,
      center:true,
      navText: [ '<span class="icon ion-arrow-left-a"></span>', '<span class="icon ion-arrow-right-a"></span>' ],
      responsive:{
        0:{
          items:1
        },
        600:{
          items:1
        },
        1200:{
          items:1
        }
      }
    });       
  }

 if ($('.testimonial-slider').length) {
    $('.testimonial-slider').owlCarousel({
      loop:true,
      margin:0,
      nav:false,
      autoplay: true,
      center:true,
      pagination:true,
      navText: [ '<span class="icon ion-arrow-left-a"></span>', '<span class="icon ion-arrow-right-a"></span>' ],
      responsive:{
        0:{
          items:1
        },
        600:{
          items:1
        },
        1200:{
          items:1
        }
      }
    });       
  }
   if ($('.client-slider').length) {
    $('.client-slider').owlCarousel({
      loop:true,
      margin:0,
      nav:false,
      autoplay:true,
    autoplayTimeout:2000,
      pagination:false,
      dots: false,
      center:true,
      
      responsive:{
        0:{
          items:2
        },
        600:{
          items:3
        },
        1200:{
          items:5
        }
      }
    });       
  }
  

  /*------------------------------------
Portfolio pop Up
--------------------------------------*/

// the containers for all your galleries
$('.popup-gallery').magnificPopup({
  delegate: '.popup-box', // the selector for gallery item
  type: 'image',
  gallery: {
    enabled: true
  }
});
	
	$(window).on("load", function() {
		var preload = $('.preloader');
		preload.find('.spinner').fadeOut(function(){
			preload.fadeOut(function(){
				
			});
		});
	});

	if( $('.top-menu-onepage').length ) {

		$('.top-menu').on('click', 'a', function(){

			/* vars */
			var width = $(window).width();
			var id = $(this).attr('href');
			var h = parseFloat($(id).offset().top);
			var card_item = $(id);
			var menu_item = $(this).closest('li');

			window.location.hash = id.replace('card-', '');

			if( width >= 1240 ) {
				/* if desktop */
				if(!menu_item.hasClass('current-menu-item') && (width > 1240)) {
					/* close card items */
					menu_items.removeClass('current-menu-item');
					container.find(card_items).removeClass('animated '+animation_in);

					if($(container).hasClass('opened')) {
						container.find(card_items).addClass('animated '+animation_out);
					}

					/* open card item */
					menu_item.addClass('current-menu-item');
					container.addClass('opened');
					container.find(card_item).removeClass('animated '+animation_out);
					container.find(card_item).addClass('animated '+animation_in);
					
					$(card_items).addClass('hidden');
					
					$(card_item).removeClass('hidden');
					$(card_item).addClass('active');
				}
			}
			/* if mobile */
			if( width < 1240 ) {
				/* scroll to section */
				$('body,html').animate({
					scrollTop: h - header_offset_top
				}, 800);
			}
			return false;
		});
	}
	
	$(window).on('resize', function(){
		var width = $(window).width();
		var height = $(window).height();

		if((width < 1240)) {
			$('.card-inner').removeClass('hidden');
			$('.card-inner').removeClass('fadeOutLeft');
			$('.card-inner').removeClass('rotateOutUpLeft');
			$('.card-inner').removeClass('rollOut');
			$('.card-inner').removeClass('jackOutTheBox');
			$('.card-inner').removeClass('fadeOut');
			$('.card-inner').removeClass('fadeOutUp');
			$('.card-inner').removeClass('animated');

			$('.card-inner .card-wrap, .sidebar-wrap').slimScroll({destroy: true});
			$('.card-inner .card-wrap, .sidebar-wrap').attr('style', '');
		}
		else {
			$($('.top-menu li.current-menu-item a').attr('href')).addClass('current-menu-item');
			$('.card-inner .card-wrap').slimScroll({
				height: '100%'
			});
		}
	});

	

	/*
		Popup Menu Navigation
	*/
	
	$('.main-menu li.page_item_has_children').each(function(){
		$(this).find('> a').after('<span class="children_toggle"></span>');
	});
	$('.main-menu').on('click', '.children_toggle', function(){
		var main_menu_item = $(this).closest('.page_item_has_children');
		if(main_menu_item.hasClass('open')) {
			main_menu_item.removeClass('open');
			main_menu_item.find('> ul').slideUp(250);
		} else {
			main_menu_item.addClass('open');
			main_menu_item.find('> ul').slideDown(250);
		}
	});

	/*
		Smoothscroll
	*/
	
	if((width < 1240) && $('.top-menu-onepage').length) { 
		$(window).on('scroll', function(){
			var scrollPos = $(window).scrollTop();
			$('.top-menu ul li a').each(function () {
				var currLink = $(this);
				
				if(currLink.attr("href").charAt(0) == "#") {
					var refElement = $(currLink.attr("href"));
					if (refElement.offset().top - header_offset_top - 2 <= scrollPos) {
						$('.top-menu ul li').removeClass("current-menu-item");
						currLink.closest('li').addClass("current-menu-item");
					}
				}
			});
		});
	}

	if( width <= 560 ) {
		$(window).on('scroll', function(){
			if($(window).scrollTop() > 46) {
				$('.header').addClass('fixed');
			}
			else {
				$('.header').removeClass('fixed');
			}
		})
	}


	/* Sidebar Show/Hide */
	$('header, .profile').on('click', '.menu-btn', function(){
		$('.s_overlay').fadeIn();
		$('.content-sidebar').addClass('active');
		$('body,html').addClass('sidebar-open');
		return false;
	});
	$('.content-sidebar, .container').on('click', '.close, .s_overlay', function(){
		$('.s_overlay').fadeOut();
		$('.content-sidebar').removeClass('active');
		$('body,html').removeClass('sidebar-open');
	});

	/* Widget Title */
	$('.widget-title').wrapInner('<span class="widget-title-span"></span>');
	
	/* Default Menu */
	$('.lnk-view-menu').on('click', function(){
		var btn_text1 = $(this).find('.text').text();
		var btn_text2 = $(this).find('.text').data('text-open');
		if($('.profile').hasClass('default-menu-open')){
			$('.profile').removeClass('default-menu-open');
			$(this).find('.text').data('text-open', btn_text1);
			$(this).find('.text').text(btn_text2);
		} else {
			$('.profile').addClass('default-menu-open');
			$(this).find('.text').data('text-open', btn_text1);
			$(this).find('.text').text(btn_text2);
		}

		return false;
	});
	
	/*
		slimScroll
	*/
	
	if(width > 1240) {
		$('.card-inner .card-wrap').slimScroll({
			height: '100%'
		});
		$('.content-sidebar .sidebar-wrap, .profile .main-menu-fixed .main-menu').slimScroll({
			height: '100%'
		});
	}

	/*
		Typed
	*/

	$('.subtitle.subtitle-typed').typed({
		stringsElement: $('.typing-title'),
		backDelay: 3500, /* Delay in text change */
		typeSpeed: 0, /* Typing speed */
		loop: true
	});

	$('.theme_panel .toggle_bts').on('click', 'a.sett', function(){
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
            $('.theme_panel').removeClass('active');
		}
		else {
			$(this).addClass('active');
            $('.theme_panel').addClass('active');
		}
		return false;
	});
	

	
	/*
		Initialize masonry items
	*/
	
	var $container = $('.grid-items');
	
	$container.imagesLoaded(function() {
		$container.multipleFilterMasonry({
			itemSelector: '.grid-item',
			filtersGroupSelector: '.filter-button-group',
			percentPosition: true,
			gutter: 0
		});
	});
	

	/*
		12. Initialize masonry filter
	*/
	
	$('.filter-button-group').on('change', 'input[type="radio"]', function() {
		if ($(this).is(':checked')) {
			$('.f_btn').removeClass('active');
			$(this).closest('.f_btn').addClass('active');
		}
	
	});
	
	

	
	/*
		Validate Contact Form
	*/
	
	$("#cform").validate({
		ignore: ".ignore",
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			},			
			comment: {
				required: true
			},
			email: {
				required: true,
				email: true
			}
		},
		success: "valid",
	
	});
	


	var serv_num = $('.service-items .service-item').length;
	if(serv_num%2 == 0){
		$('.service-items .service-item').eq(serv_num-1).parent().removeClass('border-line-h');
		$('.service-items .service-item').eq(serv_num-2).parent().removeClass('border-line-h');
	} else {
		$('.service-items .service-item').eq(serv_num-1).parent().removeClass('border-line-h');
	}

	/*
		Wrap First Title Word
	*/

	$('.content .title, .widget-title-span').each(function(index) {
	    var title = $(this).text().split(' ');
	    if(title.length>1){
		    var firstWord = title[0];
		    var replaceWord = '<span class="first-word">' + firstWord + '</span>';
		    var newString = $(this).html().replace(firstWord, replaceWord);
		    $(this).html(newString);
		} else {
			$(this).html('<span class="first-letter">'+ $(this).html() + '</span>');
		}
	});
	
  

} )( jQuery );

