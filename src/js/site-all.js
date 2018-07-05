document.addEventListener('DOMContentLoaded', function() {

  /********** OPEN/CLOSE NAVIGATION  WHEN CLICKING ON NAV TRIGGER  **********/
   const touchEvent = ('ontouchstart' in document.documentElement ? 'touchstart' : 'click'),
         body = document.getElementsByTagName("body")[0],
         pageNavOverlay = document.getElementById("pageNavOverlay"),
         triggerNavContainer = document.getElementById("triggerNavContainer"),
         triggerSubNavPrimary = document.getElementsByClassName('has-sub-level');


   const toggleNav = function(event) { //toggle the left navbar
       event.preventDefault();
       body.classList.contains('menu-opened') ? body.classList.remove('menu-opened') : body.classList.add('menu-opened');
   };

   const closeNav = function(event) { //close the left navbar
       body.classList.remove('menu-opened');
   };

   const toggleSubNav = function(event) { //toggle the subnav with arrow
     event.preventDefault();
     event.currentTarget.classList.toggle('show');
   };

   if(document.getElementById('pageHeaderMobile')) {
     triggerNavContainer.addEventListener(touchEvent, toggleNav);
     pageNavOverlay.addEventListener(touchEvent, closeNav);

     for(let i=0,x=triggerSubNavPrimary.length; i<x; i++) {
       triggerSubNavPrimary[i].addEventListener(touchEvent, toggleSubNav);
     }

     window.addEventListener('resize', function() { //on resize, if window width > 1024px then close the nav
       if(this.innerWidth > 1024) closeNav();
     });
   }



   /********** OPEN/CLOSE NAVIGATION WHEN CLICKING ON NAV TRIGGER **********/



    /********** Open/Close modal boxs **********/
    if(document.getElementsByClassName("page-modals").length > 0) {
        var triggerOpenModal = document.getElementsByClassName("trigger-open-modal");
        var pageModal = document.getElementsByClassName("page-modals");
        var boxModal = pageModal[0].getElementsByClassName("box-modal");
        var triggerCloseModal = document.getElementsByClassName('trigger-close-modal');


        var openModal = function() {

            var data = this.dataset.modal;

            pageModal[0].classList.add("show");

            for (var i = 0 ; i < boxModal.length; i++) {
                if(boxModal[i].dataset.modal == data) {
                    boxModal[i].classList.add('show');
                }
            }
        };

        for (var i = 0 ; i < triggerOpenModal.length; i++) {
           triggerOpenModal[i].addEventListener('click' , openModal);
        }



        var closeModal = function() {

            pageModal[0].classList.remove('show');

            for (var i = 0 ; i < boxModal.length; i++) {
                boxModal[i].classList.remove('show');
            }
        };

        for (var i = 0 ; i < triggerCloseModal.length; i++) {
           triggerCloseModal[i].addEventListener('click' , closeModal);
        }
      }
    /********** Open/Close modal boxs **********/



    /********** CAROUSEL **********/
        var menuCarousel = tns({
            container: '#menuCarousel',
            controlsContainer: "#customize-controls",
            mouseDrag: true,
            responsive:{
                0:{
                    items:3,
                    nav:true
                },
                600:{
                    items:3,
                    nav:false
                },
                1000:{
                    items:5,
                    nav:false
                }
            }
        });

        var sliderStepsCommande = tns({
            container: '#stepsCommandeCarousel',
            mouseDrag: true,
            loop: true,
            controls: false,
            responsive:{
                0:{
                    items:1,
                    nav:true,
                    gutter:0,

                },
                1000:{
                    items:3,
                    nav:false,
                    gutter:20

                }
            }
        });
    /********** CAROUSEL **********/



    /********** Inputs underline animation **********/
        var inputs = document.querySelectorAll('.form-1 textarea, .form-1 input');

        var focusInAnimation = function() {
            this.parentNode.classList.add('active');
        };

        var focusOutAnimation = function() {
            if(this.value == "")
                this.parentNode.classList.remove('active');
        };

        for (var i = 0 ; i < inputs.length; i++) {
            inputs[i].addEventListener('focusin', focusInAnimation);
            inputs[i].addEventListener('focusout', focusOutAnimation);
        }
    /********** Inputs underline animation **********/


    /********** Custom Input Number **********/
       if(document.getElementById("numberQuantite") != null) {
            var customInputNumberField = document.getElementById("numberQuantite");
            var buttonCustomInputNumber = customInputNumberField.getElementsByTagName('button');
            var quantiteInput = document.getElementById("quantiteInput");
            var priceSingleFood = document.getElementById("priceSingleFood");

            var buttonInputNumber = function() {
                var quantiteInputValue = quantiteInput.value;

                if(this.className == 'minus') {
                    quantiteInputValue = parseInt(quantiteInputValue) - 1;

                    priceSingleFood.innerHTML = (parseFloat(priceSingleFood.innerHTML.replace(',', '.')) - parseFloat(priceSingleFood.dataset.price)).toFixed(2).replace(".", ",") + " €";

                    if(quantiteInputValue < 0) {
                        quantiteInputValue = 0;
                        priceSingleFood.innerHTML = "0,00 €";
                    }
                }

                else if(this.className == 'plus') {
                    quantiteInputValue = parseInt(quantiteInputValue) + 1;

                    priceSingleFood.innerHTML = (parseFloat(priceSingleFood.innerHTML.replace(',', '.')) + parseFloat(priceSingleFood.dataset.price)).toFixed(2).replace(".", ",") + " €";
                }

                quantiteInput.setAttribute('value', quantiteInputValue);
            };

            var keyUpInputNumber = function() {
                var quantiteInputValue = quantiteInput.value;

                quantiteInput.onkeydown = function(e) {
                    if(!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {
                        return false;
                    }
                }
                priceSingleFood.innerHTML = parseFloat(priceSingleFood.dataset.price * quantiteInputValue).toFixed(2).replace(".", ",") + " €";
            };




            quantiteInput.addEventListener('keyup', keyUpInputNumber);

            for (var i = 0 ; i < buttonCustomInputNumber.length; i++) {
               buttonCustomInputNumber[i].addEventListener('click', buttonInputNumber);
            }
        }
    /********** Custom Input Number **********/


    var btnStopCommandes = document.getElementById('btnStopCommandes');
    var btnSwitchCommandes = document.getElementById('switchCommandes');
    var pageModal = document.getElementsByClassName("page-modals");
    var boxModal = pageModal[0].getElementsByClassName("box-modal");

    var functionSwitchCommandes = function() {
      btnSwitchCommandes.classList.add('active');
      pageModal[0].classList.remove('show');
      for (var i = 0 ; i < boxModal.length; i++) {
          boxModal[i].classList.remove('show');
      }
    }

    btnStopCommandes.addEventListener('click', functionSwitchCommandes);

}, false);
