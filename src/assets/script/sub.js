$(function () {
    // SUBLOCATION - Accessibility & Change toggle type
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
            const $locationItem = $('.location_list > li');
            $locationItem.children('button').removeClass('active');
            $locationItem.children('a').removeClass('active');
            $('.under_depth').stop().slideUp();
        },
        focusSubLocation() {
            $(this).siblings('.under_depth').slideDown();
            $(this).addClass('active');
            $(this).parents('li').siblings('li').find('button').removeClass('active');
            $(this).parents('li').siblings('li').find('.under_depth').stop().slideUp();
        },
        blurSubLocation(event) {
            $('.location_list > li').each((index, list) => {
                const $list = $(list);
                const $lastChildLink = $list.find('.under_depth li:last-child a')[0];
                const isTargetLastChildLink = event.target === $lastChildLink;
                const isRelatedTargetNotInside = !$.contains($('#subLocation')[0], event.relatedTarget);

                if (isTargetLastChildLink && (event.relatedTarget === null || isRelatedTargetNotInside)) {
                    $list.find('.under_depth').stop().slideUp();
                    $list.find('button').removeClass('active');
                }
            });
        },
        init() {
            $('.location_list > li').on('mouseenter', this.openSubLocation);
            $('.location_list > li').on('mouseleave', this.closeSubLocation);
            $('.location_list button').on('focus', this.focusSubLocation);
            $('.location_list > li.home a').on('focus', this.closeSubLocationAll);
            $(document).on('focusout', (event) => subLocation.blurSubLocation(event));
        },
    };

    subLocation.init();
});
