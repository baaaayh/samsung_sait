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
        focusMenu() {
            $('.header').addClass('active');
            $('.dep2').slideDown(350);
        },
        blurMenu() {
            $('.header').removeClass('active');
            $('.dep2').slideUp(350);
        },
        openHeader() {
            if (!$('#headerSearch').is(':visible')) {
                $('.header').addClass('active');
                $('.dep2').slideDown(350);
            }
        },
        closeHeader() {
            $('.header').removeClass('active');
            $('.dep2').stop().slideUp(350);
        },
        toggleItem() {
            $(this).parents('li').toggleClass('active');
        },
        init() {
            $('#gnb > ul > li > a').on('focus', this.focusMenu);
            $('.header__logo a, #searchBtn').on('focus', this.blurMenu);
            $('.gnb').on('mouseenter', this.openHeader);
            $('.gnb').on('mouseleave', this.closeHeader);
            $('.dep2').hover(this.toggleItem).bind(this);
        },
    };

    search.init();
    header.init();
});
