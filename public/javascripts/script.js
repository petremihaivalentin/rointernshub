/* search */

function filter_tiles(searchBar) {
    var search = searchBar.value.toLowerCase();

    // filter listings
    _.forEach($('.listing'), function(listing) {
        if (!_.includes($(listing).text(), search)) {
            $(listing).gentleSlideOut();
        }
        else {
            $(listing).gentleSlideIn();
        }
    })

    // hide empty categories
    _.forEach($('.categorySection'), function(category) {
        if (_.isEmpty($(category).find('.listing:not(.filtered)'))) {
            $(category).gentleFadeOut();
        }
        else {
            $(category).gentleFadeIn();
        }
    })

    // notify if no results
    if (_.isEmpty($("#main").find('.categorySection:not(.filtered)'))) {
        $('#noresults').gentleFadeIn();
    }
    else {
        $('#noresults').gentleFadeOut();
    }
}

/* extend jquery with gentle animations */

(function( $ ){
    $.fn.gentleSlideOut = function() {
        if ($(this).hasClass('filtered')) {
            return this;
        }
        $(this).stop();
        $(this).addClass('filtered');
        this.animate({
            opacity: 0,
            width: '0px',
            'margin-right': '0px',
            'padding-left': '0px'
        }, {
            duration: 400,
            complete: function () {
                $(this).hide();
            }
        });
        return this;
    };
    $.fn.gentleSlideIn = function() {
        if (!$(this).hasClass('filtered')) {
            return this;
        }
        $(this).stop();
        $(this).removeClass('filtered');
        $(this).show(); // since animate's start function doesn't work
        this.animate({
            opacity: 1,
            width: '398px',
            'margin-right': '20px',
            'padding-left': '15px'
        }, {
            duration: 400
        });
        return this;
    }; 
    $.fn.gentleFadeOut = function() {
        if ($(this).hasClass('filtered')) {
            return this;
        }
        $(this).stop();
        $(this).addClass('filtered');
        this.animate({
            opacity: 0
        }, {
            duration: 400,
            complete: function () {
                $(this).hide();
            }
        });
        return this;
    }; 
    $.fn.gentleFadeIn = function() {
        if (!$(this).hasClass('filtered')) {
            return this;
        }
        $(this).stop();
        $(this).removeClass('filtered');
        $(this).show(); // since animate's start function doesn't work
        this.animate({
            opacity: 1
        }, {
            duration: 400
        });
        return this;
    }; 
})(jQuery);