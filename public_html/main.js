


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

document.addEventListener("DOMContentLoaded", function() {
    // Initialize all carousels on the page
    document.querySelectorAll('.carousel-track').forEach(track => {
        setupCarousel(track);
    });
});

function setupCarousel(track) {
    const cards = track.querySelectorAll('.card');
    const prevBtn = track.closest('.carousel-wrapper').querySelector('.carousel-arrow.prev');
    const nextBtn = track.closest('.carousel-wrapper').querySelector('.carousel-arrow.next');
    
    let currentIndex = 0;
    let autoScrollInterval;
    const cardCount = cards.length;
    let visibleCards = window.innerWidth <= 768 ? 1 : 3;
    
    // Set initial positions
    updateCarousel();
    
    // Auto-scroll every 4 seconds
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            moveNext();
        }, 4000);
    }
    
    // Start auto-scroll
    startAutoScroll();
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        clearInterval(autoScrollInterval);
        moveNext();
        startAutoScroll();
    });
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        clearInterval(autoScrollInterval);
        movePrev();
        startAutoScroll();
    });
    
    // Pause on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        startAutoScroll();
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newVisibleCards = window.innerWidth <= 768 ? 1 : 3;
        if (newVisibleCards !== visibleCards) {
            visibleCards = newVisibleCards;
            updateCarousel();
        }
    });
    
    // Navigation functions - MODIFIED FOR MOBILE
    function moveNext() {
        if (window.innerWidth <= 768) {
            // On mobile, move by exactly 1 full card
            currentIndex = Math.min(currentIndex + 1, cardCount - 1);
        } else {
            // On desktop, move by 1 (showing 3 cards at a time)
            currentIndex = (currentIndex + 1) % cardCount;
        }
        updateCarousel();
    }
    
    function movePrev() {
        if (window.innerWidth <= 768) {
            // On mobile, move by exactly 1 full card backward
            currentIndex = Math.max(currentIndex - 1, 0);
        } else {
            // On desktop
            currentIndex = (currentIndex - 1 + cardCount) % cardCount;
        }
        updateCarousel();
    }
    
    function updateCarousel() {
        const cardWidth = 100 / visibleCards;
        let offset;
        
        if (window.innerWidth <= 768) {
            // Mobile - simple full card movement
            offset = -currentIndex * 100;
        } else {
            // Desktop - normal movement
            offset = -currentIndex * cardWidth;
        }
        
        track.style.transform = `translateX(${offset}%)`;
    }
}
