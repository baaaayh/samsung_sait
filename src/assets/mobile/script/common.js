$(function () {
    const handleHeaderColor = {
        colorChange() {
            if ($('#searchBtn').hasClass('active')) {
                $('.header').addClass('active');
            } else {
                $('.header').removeClass('active');
            }
        },
        init() {
            $(window).on('load', function () {
                $('#searchBtn').on('click', handleHeaderColor.colorChange);
            });
        },
    };
    const search = {
        closeSearch(e) {
            const $target = $(e.target);
            if (!$target.closest('.util__search').length && !$target.closest('#headerSearch').length) {
                $('#header').removeClass('active');
                $('#searchBtn').removeClass('active');
                TweenMax.to('.header_wrap', 0.2, { height: 50, ease: 'Expo.ease' });
                TweenMax.to('.dimmed', 0.4, { opacity: 0, display: 'none', ease: 'Expo.ease' });
            }
        },
        init() {
            $(document).on('click', (e) => this.closeSearch(e));
        },
    };

    return [search.init(), handleHeaderColor.init()];
});
