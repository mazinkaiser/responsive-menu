  /*
   
   plugin: responsive menu 
   version: 1.0
   date: 22.08.2013
   site: www.area53.ru
    
  */

    (function($){

        $.fn.navigation = function(options){

         // ToDo list : oldie and switcher for responsive

          // default params

          var params = {
            showEffect: 'default', // effect for dropdown menu (fade, slide-fade, slide, default)
            duration: 1000,  // animate duration
            breakPoint: 700, // point of width screen for collapse menu
            cssAnimate: true, // animation with css or javascript
            //oldIe: false, // set true for old ie 
            //responsive: true // if you need fixed width set false
          };

          var _this = $(this);

          var options = $.extend(params, options);
          $('<div class="switcher">&#9776;</div>').insertBefore(this);
                    
          var showMenu = function(){

            $('.switcher').click(function(){       
              $('.menu').toggleClass('show'); 
            });

          }; // end showMenu function

          var addClasses = function(){

            if(options.cssAnimate==true){
              _this.find('li ul').addClass('animate-transition');
              _this.addClass('css-animate');
            }else{
              _this.addClass('js-animate');
            }
                 
          }; // end addClasses function

          var effectClick = function(){

             // show next level menu for small screen

            $('.small-screen > li').on('click',function(e){
                e.stopPropagation();                   
                  var selfClick = $(this).find('ul').is(':visible');
                  if(!selfClick){
                    $(this).parent().find('ul:visible').hide();
                  }
                  $(this).find('ul').slideToggle();
            });

          }; // end effectClick function

          var resizeMenu = function(){

            // reset functions before initialize and after resize

            if($(window).width() < options.breakPoint) {
              $('.menu').addClass('small-screen').removeClass('large-screen');
               $('.menu > li').off();
               effectClick();    
            }else if($(window).width() >= options.breakPoint){
              $('.menu').addClass('large-screen').removeClass('small-screen');
              $('.menu > li').off();
               if($('.submenu').is(':visible')){
                  $('.submenu').hide();
               }
               effectHover(options.showEffect, options.duration);        
            }
            $('.small-screen > li > a').click(function(e){
              e.preventDefault();
            });

          }; // end resizeMenu function

          var effectHover = function(effect,delay){

            if(options.cssAnimate!==true){ // use js animate or css3 animate             
               $('.menu > li').on({
                 mouseover: function(){ 
                  switch(effect){
                    case 'slide':
                      $(this).find('.submenu').stop().slideDown(delay); 
                      break;
                    case 'default':
                      $(this).find('.submenu').stop().show(); 
                      break;
                    case 'fade':
                      $(this).find('.submenu').stop().fadeIn(delay); 
                      break;
                    case 'slide-fade':
                        $(this).find('.submenu').stop()
                         .animate({
                          'height':'toggle',
                          'opacity':'toggle'
                        },delay);
                      break;
                  }        
                },
                mouseout: function(){           
                    switch(effect){
                      case 'slide':
                        $(this).find('.submenu').stop().slideUp(delay); 
                        break;
                      case 'default':
                        $(this).find('.submenu').stop().hide(); 
                        break;
                      case 'fade':
                       $(this).find('.submenu').stop().fadeOut(delay); 
                       break;
                      case 'slide-fade':
                        $(this).find('.submenu').stop()
                         .animate({
                          'height':'toggle',
                          'opacity':'toggle'
                        },delay);
                      break;
                    }
                }

             });

            }

          }; // end effectHover function

          var initialize = function() {

              showMenu(); 
              addClasses();
              $(window).resize(); 

          }; // end initialize function
  
        $(window).on('resize', function(){

            resizeMenu();       
     
        });

        initialize();
          
      }

    })(jQuery);