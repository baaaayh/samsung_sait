$(function () {
    const search = {
        toggleSearch(e) {
            if ($(e.target).hasClass('active') && $('.main-section.active').attr('data-color') !== 'white') {
                $('.header').removeClass('white');
            } else {
                $('.header').addClass('white');
            }
        },
        init() {
            $('#searchBtn').on('click', (e) => this.toggleSearch(e));
        },
    };

    return search.init();
});
