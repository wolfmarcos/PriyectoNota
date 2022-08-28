(function($) {

  $.fn.menumaker = function(options) {
      
      var cssmenu = $(this), settings = $.extend({
        title: "Menu",
        format: "dropdown",
        breakpoint: 768,
        sticky: false
      }, options);

      return this.each(function() {
        cssmenu.find('li ul').parent().addClass('has-sub');
        if (settings.format != 'select') {
          cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
          $(this).find("#menu-button").on('click', function(){
            $(this).toggleClass('menu-opened');
            var mainmenu = $(this).next('ul');
            if (mainmenu.hasClass('open')) { 
              mainmenu.hide().removeClass('open');
            }
            else {
              mainmenu.show().addClass('open');
              if (settings.format === "dropdown") {
                mainmenu.find('ul').show();
              }
            }
          });

          multiTg = function() {
            cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
            cssmenu.find('.submenu-button').on('click', function() {
              $(this).toggleClass('submenu-opened');
              if ($(this).siblings('ul').hasClass('open')) {
                $(this).siblings('ul').removeClass('open').hide();
              }
              else {
                $(this).siblings('ul').addClass('open').show();
              }
            });
          };

          if (settings.format === 'multitoggle') multiTg();
          else cssmenu.addClass('dropdown');
        }

        else if (settings.format === 'select')
        {
          cssmenu.append('<select style="width: 100%"/>').addClass('select-list');
          var selectList = cssmenu.find('select');
          selectList.append('<option>' + settings.title + '</option>', {
                                                         "selected": "selected",
                                                         "value": ""});
          cssmenu.find('a').each(function() {
            var element = $(this), indentation = "";
            for (i = 1; i < element.parents('ul').length; i++)
            {
              indentation += '-';
            }
            selectList.append('<option value="' + $(this).attr('href') + '">' + indentation + element.text() + '</option');
          });
          selectList.on('change', function() {
            window.location = $(this).find("option:selected").val();
          });
        }

        if (settings.sticky === true) cssmenu.css('position', 'fixed');

        resizeFix = function() {
          if ($(window).width() > settings.breakpoint) {
            cssmenu.find('ul').show();
            cssmenu.removeClass('small-screen');
            if (settings.format === 'select') {
              cssmenu.find('select').hide();
            }
            else {
              cssmenu.find("#menu-button").removeClass("menu-opened");
            }
          }

          if ($(window).width() <= settings.breakpoint && !cssmenu.hasClass("small-screen")) {
            cssmenu.find('ul').hide().removeClass('open');
            cssmenu.addClass('small-screen');
            if (settings.format === 'select') {
              cssmenu.find('select').show();
            }
          }
        };
        resizeFix();
        return $(window).on('resize', resizeFix);

      });
  };
})(jQuery);

// _______________________________________



(function($){

	/**
		Containers Array
	**/
	var hoverDropdownBoxs = new Array();

	/**
		Container Object
	**/
	var hoverDropdownBox = function( obj, options ){
		if(options.isInline){ // Inline mode
			this.parentDOM = obj;
			this.triggerDOM = obj;
		} else { // Hover mode
			this.parentDOM = $('body'); // parent object
			this.triggerDOM = obj; // Hover triger object (such as button) for Hover mode
		}

		this.options = options;

		this.dom = null;
		this.isVisible = true;
		this.items = new Array(); // hoverDropdownBoxItem
		this.footerItem = null; // hoverDropdownBoxItem

		// Initialize
		this.id = hoverDropdownBoxs.length;
		this.init();
		hoverDropdownBoxs.push(this);

		this.options.hoverDropdownBox_id = this.id;
		this.options.dropdownBox = function(){
			return hoverDropdownBoxs[ this.hoverDropdownBox_id ];
		};
		this.options.getHoverDropdownBox = function(){ // TODO! Deprecated
			return hoverDropdownBoxs[ this.hoverDropdownBox_id ];
		};

		if(!this.options.isInline){ // Hover mode
			// Append to parent DOM and set event-handler to triger DOM
			this.appendToParent();
		}

	};

})
$(function(){
	var $selects = $('select');
						
	$selects.easyDropDown({
		cutOff: 10,
		wrapperClass: 'my-dropdown-class',
		onSelect: function(selected){
			// do something
		}
	});
});