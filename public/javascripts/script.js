/* search */

function filter_tiles(searchBar) {
    var search = searchBar.value.toLowerCase();
    var animationsEnabled = $("#animationsEnabled").is(":checked");

    // filter listings
    _.forEach($('.listing'), function(listing) {
        if (!_.includes($(listing).text(), search)) {
            $(listing).gentleSlideOut(animationsEnabled);
        }
        else {
            $(listing).gentleSlideIn(animationsEnabled);
        }
    })

    // hide empty categories
    _.forEach($('.categorySection'), function(category) {
        if (_.isEmpty($(category).find('.listing:not(.filtered)'))) {
            $(category).gentleFadeOut(animationsEnabled);
        }
        else {
            $(category).gentleFadeIn(animationsEnabled);
        }
    })

    // notify if no results
    if (_.isEmpty($("#main").find('.categorySection:not(.filtered)'))) {
        $('#noresults').gentleFadeIn(animationsEnabled);
    }
    else {
        $('#noresults').gentleFadeOut(animationsEnabled);
    }
}

/* extend jquery with gentle animations */

(function( $ ){
    $.fn.gentleSlideOut = function(animationsEnabled) {
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
            duration: animationsEnabled ? 400 : 0,
            complete: function () {
                $(this).hide();
            }
        });
        return this;
    };
    $.fn.gentleSlideIn = function(animationsEnabled) {
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
            duration: animationsEnabled ? 400 : 0,
        });
        return this;
    }; 
    $.fn.gentleFadeOut = function(animationsEnabled) {
        if ($(this).hasClass('filtered')) {
            return this;
        }
        $(this).stop();
        $(this).addClass('filtered');
        this.animate({
            opacity: 0
        }, {
            duration: animationsEnabled ? 400 : 0,
            complete: function () {
                $(this).hide();
            }
        });
        return this;
    }; 
    $.fn.gentleFadeIn = function(animationsEnabled) {
        if (!$(this).hasClass('filtered')) {
            return this;
        }
        $(this).stop();
        $(this).removeClass('filtered');
        $(this).show(); // since animate's start function doesn't work
        this.animate({
            opacity: 1
        }, {
            duration: animationsEnabled ? 400 : 0,
        });
        return this;
    }; 
})(jQuery);