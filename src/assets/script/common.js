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
        // toggleState() {
        //     $('.header').toggleClass('active');
        //     $('.dep2').stop().slideToggle();
        // },
        openHeader() {
            $('.header').addClass('active');
            $('.dep2').stop().slideDown(340);
        },
        closeHeader() {
            $('.header').removeClass('active');
            $('.dep2').stop().slideUp(340);
        },
        toggleItem() {
            $(this).parents('li').toggleClass('active');
        },
        init() {
            // $('#gnb').hover(this.toggleState);
            $('.gnb').on('mouseenter', this.openHeader);
            $('.gnb').on('mouseleave', this.closeHeader);
            $('.dep2').hover(this.toggleItem).bind(this);
        },
    };

    search.init();
    header.init();
});
