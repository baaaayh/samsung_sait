$(function () {
    let mainChk = $('.main').length;
    let ww = $(window).innerWidth();
    let counterIdx = 0;
    let totalSection = $('.main-section').length - 1;

    $(window).on('resize', function () {
        ww = $(window).innerWidth();
    });

    if (mainChk) {
        history.scrollRestoration = 'manual';

        let $body = $('body'),
            $wrap = $('.wrap'),
            currentIndex = 0,
            isMove = false,
            isText = false,
            mouseWheel = 0;
        let startY, endY;

        var onePageScroll = {
            // mouse wheel
            handleWheel: function (e) {
                if (!$('.all-menu').hasClass('active') && !$('.popup--main').hasClass('active')) {
                    if (!this.isMobile()) {
                        if (!isMove) {
                            if (e.originalEvent.deltaY > 0) {
                                if (!this.isLast()) {
                                    isMove = true;
                                    currentIndex++;
                                    this.setTransitionSection();
                                }
                            } else {
                                if (!this.isFirst()) {
                                    isMove = true;
                                    currentIndex--;
                                    this.setTransitionSection();
                                }
                            }
                        }
                    }
                }
            },
            // 터치
            handleTouch: function (e) {
                startY = e.originalEvent.changedTouches[0].screenY;
            },
            handleTouchMove: function (e) {
                if (!$('.all-menu').hasClass('active') && !$('.popup--main').hasClass('active')) {
                    if (!this.isMobile()) {
                        if (!isMove) {
                            endY = e.originalEvent.changedTouches[0].screenY;
                            if (startY - endY > 50) {
                                if (!this.isLast()) {
                                    isMove = true;
                                    currentIndex++;
                                    this.setTransitionSection();
                                }
                            } else if (endY - startY > 50) {
                                if (!this.isFirst()) {
                                    isMove = true;
                                    currentIndex--;
                                    this.setTransitionSection();
                                }
                            }
                        }
                    }
                }
            },
            // pc/mo 구분
            isMobile: function () {
                let ww = window.innerWidth;
                return ww <= 1024;
            },
            isOverFlow() {
                if (this.isMobile()) {
                    $body.removeClass('scroll-lock');
                    currentIndex = 0;
                    $('#main').css('transform', 'translate3d(0, 0, 0)');
                } else {
                    $body.addClass('scroll-lock');
                    $(window).scrollTop(0, 0);
                }
                $('.indicator li').eq(currentIndex).addClass('active').find('span').show().siblings('li').removeClass('active');
            },
            // 섹션 넘기기

            setTransitionSection: function (idx) {
                if (idx >= 0) {
                    currentIndex = idx;
                }

                if (currentIndex < totalSection) {
                    $('.main').css('transform', 'translate3d(0px, -' + currentIndex * window.innerHeight + 'px, 0px)');
                    $('.footer').removeClass('active');
                }

                if (currentIndex >= totalSection) {
                    $('.main').css('transform', 'translate3d(0px, -' + ((currentIndex - 1) * window.innerHeight + $('.main-section').eq(currentIndex)[0].clientHeight) + 'px, 0px)');
                }

                setTimeout(function () {
                    isMove = false;
                }, 1200);

                this.setCurrentSection();
            },
            setCurrentSection: function () {
                let currentSection = $('.main-section').eq(currentIndex);
                // indicator
                if (currentIndex <= totalSection) {
                    $('.indicator li').eq(currentIndex).addClass('active').siblings('li').removeClass('active');
                }

                // section active
                $('.main-section').removeClass('active');
                currentSection.addClass('active').siblings('.main-section').removeClass('active');
                $('.main-section').find('.aos-init').removeClass('aos-animate');
                $('.main-section.active').find('.aos-init').addClass('aos-animate');
                $('.indicator li.active span').slideDown(700).parents('li').siblings('li').find('span').slideUp(700);
                //currentSection.siblings('.main-section').find('.aos-init').removeClass('aos-animate');
                // 섹션 컬러라이징
                if (currentSection.data('color') === 'white') {
                    $wrap.addClass('white');
                } else {
                    $wrap.removeClass('white');
                }
                if (currentSection.data('name') === 'counter') {
                    setTimeout(function () {
                        // $('.numbers').countTo({
                        //     formatter: function (value, options) {
                        //         return value
                        //             .toFixed(0)
                        //             .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
                        //     },
                        // });
                    }, 100);
                }
                if (currentSection.data('name') === 'counter') {
                    counterStart();
                }
            },
            isFirst: function () {
                return currentIndex === 0;
            },
            isLast: function () {
                return $('.main-section').length == currentIndex + 1;
            },
            goFirst() {
                $('.main').css('transform', 'translate3d(0px, 0px, 0px)');
                currentIndex = 0;
                this.setTransitionSection();
                $(window).scrollTop(0);
            },
            handleMobileScroll: function (e) {
                const $mainSections = $('.main-section');
                let sectionsTop = [];
                if (this.isMobile()) {
                    let scTop = $(this).scrollTop();
                    $mainSections.each((index, section) => {
                        sectionsTop.push(section.offsetTop);
                    });
                    // 섹션 Active
                    for (let i = 0; i < sectionsTop.length; i++) {
                        if (scTop >= sectionsTop[i] && scTop < sectionsTop[i + 1]) {
                            $mainSections.eq(i).addClass('active').siblings().removeClass('active');
                        }
                        if (scTop >= sectionsTop[sectionsTop.length - 1]) {
                            $mainSections
                                .eq(sectionsTop.length - 1)
                                .addClass('active')
                                .siblings()
                                .removeClass('active');
                        }
                    }
                    // 섹션 컬러라이징
                    let currentSection = $('.main-section.active');

                    if (currentSection.data('color') === 'white') {
                        $wrap.addClass('white');
                    } else {
                        $wrap.removeClass('white');
                    }

                    let centerPoint = $(window).scrollTop() + $(window).outerHeight(true) / 2;
                    if (centerPoint > $('.main-career').offset().top) {
                        if (counterIdx === 0) {
                            counterStart();
                            counterIdx += 1;
                        }
                    }
                }
            },
            // 인디케이터로 풀페이지 핸들링
            indicatorHandler: function (e) {
                if (!isMove) {
                    isMove = true;
                    let idx = $(e.target).parents('li').index();
                    this.setTransitionSection(idx);
                }
            },
            scrollBtnHandler: function () {
                if (!isMove) {
                    (isMove = true), this.setTransitionSection(1);
                }
            },
            keyDownHandler: function (e) {
                if (e.originalEvent.key === 'ArrowDown') {
                    this.setTransitionSection(currentIndex + 1);
                } else if (e.originalEvent.key === 'ArrowUp') {
                    this.setTransitionSection(currentIndex - 1);
                } else {
                    let idx = e.originalEvent.key - 1;
                    this.setTransitionSection(idx);
                }
            },
            init: function () {
                this.isOverFlow();
                $('.main-section').eq(currentIndex).addClass('active');
                $(window).on('wheel', (e) => this.handleWheel(e));
                $(window).on('touchstart', (e) => this.handleTouch(e));
                $(window).on('touchend', (e) => this.handleTouchMove(e));
                $(window).on('resize', () => this.isOverFlow());
                $(window).on('scroll touchmove', () => this.handleMobileScroll());
                $('.scroll-box').on('click', () => this.scrollBtnHandler());
                $(window).on('keydown', (e) => this.keyDownHandler(e));
                $('.indicator li a').on('click', (e) => this.indicatorHandler(e));
                $('.scroll-down').on('click', () => this.setTransitionSection(1));
                $(window).on('resize', () => this.setTransitionSection());
            },
        };
        onePageScroll.init();
    }

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
                touchRatio: 0,
                on: {
                    autoplayTimeLeft(s, time, progress) {
                        $('.main-kv__bar').css({ width: (1 - progress) * 100 + '%' });
                    },
                },
            });
        },
        sliderInit() {
            // const researchArr = ['AI Algorithms', 'Computing Platform', 'Human Augmentation', 'Metaphotonics', 'Nano Electronics', 'Display Materials', 'Battery Materials', 'Semiconductor Materials', 'Environmental Research'];
            const bgSlider = new Swiper('.bg-slider', {
                autoplay: false,
                loop: true,
                effect: 'fade',
                fadeEffect: { crossFade: true },
                hashNavigation: {
                    watchState: true,
                },
                touchRatio: 0,
                // pagination: {
                //     el: '.research__list',
                //     clickable: true,
                //     renderBullet: function (index, className) {
                //         return '<li class="' + className + '"><span>' + (index < 9 ? '0' : '') + (index + 1) + '</span><button type="button">' + researchArr[index] + '</button><a href="javascript:;"></a></li>';
                //     },
                // },
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
                slidesPerView: 2,
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
        init() {
            this.mainKvInit();
            this.sliderInit();
        },
    };

    main.init();
});
