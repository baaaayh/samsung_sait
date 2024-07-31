$(function () {
    // SUBLOCATION - Accessibility & Change toggle type
    let prevEl = null;
    const subLocation = {
        openSubLocation() {
            $(this).find('.under_depth').slideDown();
            $(this).parents('li').addClass('active');
            $(this).siblings('li').find('.under_depth').stop().slideUp();
        },
        closeSubLocation() {
            $(this).find('.under_depth').stop().slideUp();
            $(this).removeClass('active');
        },
        closeSubLocationAll() {
            $('.location_list li button').removeClass('active');
            $('.location_list li.home a').removeClass('active');
            $('.under_depth').stop().slideUp();
        },
        focusSubLocation() {
            $(this).siblings('.under_depth').slideDown();
            $(this).addClass('active');
            $(this).parents('li').siblings('li').find('button').removeClass('active');
            $(this).parents('li').siblings('li').find('.under_depth').stop().slideUp();
        },
        setCurrentEl(event) {
            prevEl = event.target;
        },
        blurSubLocation(event) {
            let openLocation = $('.location_list > li').find($(event.target)).length > 0;
            $('.location_list > li').each((index, list) => {
                if (prevEl === $(list).find('.under_depth li:last-child a')[0] && !openLocation) {
                    $(list).find('.under_depth').stop().slideUp();
                }
            });
        },
        init() {
            $('.location_list > li').on('mouseenter', this.openSubLocation);
            $('.location_list > li').on('mouseleave', this.closeSubLocation);
            $('.location_list button').on('focus', this.focusSubLocation);
            $('.location_list > li.home a').on('focus', this.closeSubLocationAll);
            $(document).on('focusin', (event) => subLocation.blurSubLocation(event));
            $(document).on('focusout', (event) => subLocation.setCurrentEl(event));
        },
    };

    subLocation.init();
});
