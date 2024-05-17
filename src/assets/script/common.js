$(function () {
    const search = {
        openSearch(e) {
            if ($(e.target).hasClass('active')) {
                $('.header').removeClass('white');
            } else {
                $('.header').addClass('white');
            }
        },
        init() {
            $(document).on('click', (e) => this.closeSearch(e));
            $('#searchBtn').on('click', (e) => this.openSearch(e));
        },
    };

    return search.init();
});
