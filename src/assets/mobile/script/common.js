$(function () {
    const search = {
        init() {
            $(document).on('click', (e) => {
                const $target = $(e.target);
                if (!$target.closest('.util__search').length && !$target.closest('#headerSearch').length) {
                    $('#searchBtn').removeClass('active');
                    TweenMax.to('.header_wrap', 0.2, { height: 50, ease: 'Expo.ease' });
                    TweenMax.to('.dimmed', 0.4, { opacity: 0, display: 'none', ease: 'Expo.ease' });
                }
            });
        },
    };

    return search.init();
});
