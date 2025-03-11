


(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})

document.addEventListener("DOMContentLoaded", function () {
    function initializeCarousel(trackSelector, prevSelector, nextSelector) {
        const track = document.querySelector(trackSelector);
        const prevButton = document.querySelector(prevSelector);
        const nextButton = document.querySelector(nextSelector);

        if (!track || !prevButton || !nextButton) return;

        let currentIndex = 0;
        const cards = Array.from(track.children);
        const totalCards = cards.length;
        const visibleCards = 3; // Adjust this based on design

        function updateCarousel() {
            const offset = -currentIndex * (100 / visibleCards);
            track.style.transform = `translateX(${offset}%)`;
        }

        function moveNext() {
            if (currentIndex < totalCards - visibleCards) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }

        function movePrev() {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = totalCards - visibleCards;
            }
            updateCarousel();
        }

        function startAutoScroll() {
            return setInterval(moveNext, 4000);
        }

        let autoScroll = startAutoScroll();

        prevButton.addEventListener("click", () => {
            movePrev();
            clearInterval(autoScroll);
            autoScroll = startAutoScroll();
        });

        nextButton.addEventListener("click", () => {
            moveNext();
            clearInterval(autoScroll);
            autoScroll = startAutoScroll();
        });

        track.addEventListener("mouseenter", () => clearInterval(autoScroll));
        track.addEventListener("mouseleave", () => autoScroll = startAutoScroll());

        updateCarousel();
    }

    // Initialize carousels separately
    initializeCarousel(".service-track", ".service-prev", ".service-next");
    initializeCarousel(".project-track", ".project-prev", ".project-next");
});
