/* constants */

var ANIMATIONS_ENABLED_DEFAULT = true;
var ANIMATION_DURATION = 250;

/* on start */

$(document).ready(function () {
    initState();
    initHandlers();
});

function initState() {
    $('#animationsEnabled').prop('checked', isAnimationEnabled());
}

function initHandlers() {
    $('#searchbar').on('input', filter_tiles);
    $('#animationsEnabled').change(toggleAnimations);
    $('.categoryToggle').click(toggleCategory);
}

/* state */

function isAnimationEnabled() {
    var animationsEnabled = JSON.parse(localStorage.getItem('animationsEnabled'));
    return animationsEnabled === null ? ANIMATIONS_ENABLED_DEFAULT : animationsEnabled;
}

/* handlers */

function toggleAnimations() {
    var animationsEnabled = $("#animationsEnabled").is(":checked");
    localStorage.setItem('animationsEnabled', JSON.stringify(animationsEnabled));
}

function toggleCategory() {
    var sites = $(this).siblings(".sites");
    sites.slideToggle(isAnimationEnabled() ? ANIMATION_DURATION : 0);
    $(this).toggleText("\u25BC", "\u25B6")
}

function filter_tiles() {
    var search = _.toLower($("#searchbar").val());
    var animated = isAnimationEnabled();

    // filter listings
    _.forEach($('.listing'), function(listing) {
        if (!_.includes($(listing).text(), search)) {
            $(listing).gentleSlideOut(animated);
        }
        else {
            $(listing).gentleSlideIn(animated);
        }
    });

    // hide empty categories
    _.forEach($('.categorySection'), function(category) {
        if (_.isEmpty($(category).find('.listing:not(.filtered)'))) {
            $(category).gentleFadeOut(animated);
        }
        else {
            $(category).gentleFadeIn(animated);
        }
    });

    // notify if no results
    if (_.isEmpty($("#main").find('.categorySection:not(.filtered)'))) {
        $('#noresults').gentleFadeIn(animated);
    }
    else {
        $('#noresults').gentleFadeOut(animated);
    }
}

(function( $ ){
    /* gentle animations */

    $.fn.gentleSlideOut = function(animated) {
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
            duration: animated ? ANIMATION_DURATION : 0,
            complete: function () {
                $(this).hide();
            }
        });
        return this;
    };
    $.fn.gentleSlideIn = function(animated) {
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
            duration: animated ? ANIMATION_DURATION : 0,
        });
        return this;
    }; 
    $.fn.gentleFadeOut = function(animated) {
        if ($(this).hasClass('filtered')) {
            return this;
        }
        $(this).stop();
        $(this).addClass('filtered');
        this.animate({
            opacity: 0
        }, {
            duration: animated ? ANIMATION_DURATION : 0,
            complete: function () {
                $(this).hide();
            }
        });
        return this;
    }; 
    $.fn.gentleFadeIn = function(animated) {
        if (!$(this).hasClass('filtered')) {
            return this;
        }
        $(this).stop();
        $(this).removeClass('filtered');
        $(this).show(); // since animate's start function doesn't work
        this.animate({
            opacity: 1
        }, {
            duration: animated ? ANIMATION_DURATION : 0,
        });
        return this;
    };

    /* util */

    $.fn.toggleText = function(a, b) {
        return this.text(this.text() == b ? a : b);
    };
})(jQuery);