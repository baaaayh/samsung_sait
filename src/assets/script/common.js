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

    const header = {
        openHeader() {
            if (!$('#headerSearch').is(':visible')) {
                $('.header').addClass('active');
                $('.dep2').slideDown(340);
            }
        },
        closeHeader() {
            $('.header').removeClass('active');
            $('.dep2').stop().slideUp(340);
        },
        toggleItem() {
            $(this).parents('li').toggleClass('active');
        },
        init() {
            $('.gnb').on('mouseenter', this.openHeader);
            $('.gnb').on('mouseleave', this.closeHeader);
            $('.dep2').hover(this.toggleItem).bind(this);
        },
    };

    search.init();
    header.init();
});
