$(function () {
    const search = {
        closeSearch(e) {
            const $target = $(e.target);
            if (!$target.closest('.util__search').length && !$target.closest('#headerSearch').length) {
                $('#searchBtn').removeClass('active');
                TweenMax.to('#headerSearch', 0.2, { display: 'none', height: 0, ease: 'Expo.ease' });
                TweenMax.to('.dimmed', 0.4, { opacity: 0, display: 'none', ease: 'Expo.ease' });
            }
        },
        init() {
            $(document).on('click', (e) => this.closeSearch(e));
        },
    };

    return search.init();
});
