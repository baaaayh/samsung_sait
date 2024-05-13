$(function () {
    let ww = $(window).innerWidth();

    const main = {
        mainKvInit() {
            let mainKV = new Swiper('.main-kv', {
                slidesPerView: 1,
                autoplay: {
                    delay: 7000,
                },
                loop: true,
                pagination: {
                    el: '.main-kv__control',
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<li class="' + className + '"><span type="button" >' + (index < 9 ? '0' : '') + (index + 1) + '</span><div class="main-kv__bg"><span class="main-kv__bar"></span></div></li>';
                    },
                },
                effect: 'fade',
                fadeEffect: { crossFade: true },
                hashNavigation: {
                    watchState: true,
                },
                resizeObserver: false,
                on: {
                    autoplayTimeLeft(s, time, progress) {
                        $('.main-kv__bar').css({ width: (1 - progress) * 100 + '%' });
                    },
                },
            });
        },
        sliderInit() {
            const bgSlider = new Swiper('.bg-slider', {
                autoplay: false,
                loop: true,
                effect: 'fade',
                fadeEffect: { crossFade: true },
                hashNavigation: {
                    watchState: true,
                },
                speed: 1200,
                observer: true,
                observeParents: true,
            });

            const textSlider = new Swiper('.text-slider', {
                autoplay: false,
                loop: true,
                effect: 'fade',
                touchRatio: 0,
                fadeEffect: { crossFade: true },
            });
            const imageSlider = new Swiper('.image-slider', {
                parallax: true,
                speed: 1200,
                // slidesPerView: '1',
                // autoplay: false,
                touchRatio: 0,
                // loop: true,
            });
            bgSlider.controller.control = [textSlider, imageSlider];

            $('.research__list li').on('click', function () {
                const idx = $(this).index();
                $(this).addClass('active').siblings('li').removeClass('active');
                bgSlider.slideTo(idx);
                textSlider.slideTo(idx);
                imageSlider.slideTo(idx);
            });

            const pressSlider = new Swiper('.press__slider', {
                slidesPerView: 1,
                autoplay: {
                    delay: 7000,
                    disableOnInteraction: false,
                },
                loop: true,
                hashNavigation: {
                    watchState: true,
                },
                navigation: {
                    nextEl: '.press__button--next',
                    prevEl: '.press__button--prev',
                },
                speed: 1200,
                on: {
                    init(v) {
                        main.handleProgress(v);
                    },
                },
            });
            pressSlider.on('slideChange', (v) => this.handleProgress(v));
        },
        handleProgress(event) {
            const total = event.slides.length;
            const curr = event.realIndex + 1;
            $('.press__bar').css({ width: (curr / total) * 100 + '%' });
        },
        toggleAccordion(e) {
            $(e.target).parents('.research__control').toggleClass('active');
            $(e.target).siblings('.research__list').slideToggle();
        },
        closeAccordion(e) {
            function closeAccordionMenu() {
                $('.research__list').slideUp();
                $('.research__control').removeClass('active');
            }
            if ($(e.target).parents().hasClass('research__list')) {
                const text = $(e.target).text();
                $(e.target).parents('.research__list').siblings('button').text(text);
                closeAccordionMenu();
            }
            if (!$(e.target).parents().hasClass('research__control')) {
                closeAccordionMenu();
            }
        },
        clickDocument(e) {},
        scrollNextSection() {
            const topV = $('.research__contents').offset().top;
            $('html, body').animate({ scrollTop: topV }, { duration: 1000, easing: 'easeInOutCubic' });
        },
        changeHeader(e) {
            const st = $(window).scrollTop();
            if (st > 70) {
                $('.header').addClass('active');
            } else {
                $('.header').removeClass('active');
            }
        },
        init() {
            $('.research__control > button').on('click', (e) => this.toggleAccordion(e));
            $('.research__list button').on('click', (e) => this.closeAccordion(e));
            $(document).on('click', (e) => this.closeAccordion(e));
            $('.scroll-down').on('click', () => this.scrollNextSection());
            $(window).on('scroll', () => this.changeHeader());
            this.mainKvInit();
            this.sliderInit();
        },
    };

    main.init();
});
