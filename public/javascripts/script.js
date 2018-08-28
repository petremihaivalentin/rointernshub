/* constants */

var ANIMATIONS_ENABLED_DEFAULT = true;
var OPEN_LINKS_IN_NEW_TAB_DEFAULT = false;
var ANIMATION_DURATION = 250;

/* on start */

$(document).ready(function () {
    initState();
    initHandlers();
});

function initState() {
    $('#animationsEnabled').prop('checked', isAnimationEnabled());
    $('#openLinksInNewTab').prop('checked', shouldOpenLinksInNewTab());

    $('#animationsEnabled-legacy').prop('checked', isAnimationEnabled());

    if (shouldOpenLinksInNewTab()) {
        configureLinkTargets();
    }
}

function initHandlers() {
    $('#searchbar').on('input', filter_tiles);
    $('#animationsEnabled').on('change', toggleAnimations);
    $('#openLinksInNewTab').on('change', toggleOpenLinksInNewTab);
    $('.categoryToggle').on('click', toggleCategory);

    $('#animationsEnabled-legacy').on('change', highlightSettings);

    $('#settings-gear').on('click', toggleSettings);
    $('html').onExcept('click', '#settings *', hideSettings);
}

/* state */

function isAnimationEnabled() {
    var animationsEnabled = JSON.parse(localStorage.getItem('animationsEnabled'));
    return animationsEnabled === null ? ANIMATIONS_ENABLED_DEFAULT : animationsEnabled;
}

function shouldOpenLinksInNewTab() {
    var openLinksInNewTab = JSON.parse(localStorage.getItem('openLinksInNewTab'));
    return openLinksInNewTab === null ? OPEN_LINKS_IN_NEW_TAB_DEFAULT : openLinksInNewTab;
}

/* configure */

function configureLinkTargets() {
    var target = shouldOpenLinksInNewTab() ? "_blank" : "_self";
    $("a.link").attr("target", target);
}

/* handlers */

function toggleSettings() {
    $("#settings-list").toggleClass("invisible");
}

function hideSettings() {
    $("#settings-list").addClass("invisible");
}

function highlightSettings() {
    // make sure this checkbox doesn't actually toggle on its own
    $('#animationsEnabled-legacy').prop('checked', isAnimationEnabled());
    // highlight the new setting and how to get there
    toggleSettings();
    $('#settings-gear').highlight();
    $('#animationsEnabled + label').highlight();
}

function toggleAnimations() {
    var animationsEnabled = $("#animationsEnabled").is(":checked");
    localStorage.setItem('animationsEnabled', JSON.stringify(animationsEnabled));

    $('#animationsEnabled-legacy').prop('checked', animationsEnabled);
}

function toggleOpenLinksInNewTab() {
    var openLinksInNewTab = $("#openLinksInNewTab").is(":checked");
    localStorage.setItem('openLinksInNewTab', JSON.stringify(openLinksInNewTab));
    configureLinkTargets();
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
        if (!$(listing).includesSearch(search)) {
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

/* jquery extensions */

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
    $.fn.highlight = function() {
        if (!$(this).hasClass("highlighted")) {
            $(this).addClass("highlighted");
            setTimeout(() => $(this).removeClass("highlighted"), 1000);
        }
        return this;
    };

    /* util */

    $.fn.toggleText = function(a, b) {
        return this.text(this.text() == b ? a : b);
    };

    $.fn.includesSearch = function (searchText) {
        return _.includes(_.toLower(this.find(".title").text()), searchText)
            || _.includes(_.toLower(this.find(".description").text()), searchText)
            || _.includes(_.toLower(this.find(".link").text()), searchText)
            || _.includes(_.toLower(this.find(".link").attr("href")), searchText)
            || _.includes(_.toLower(this.find(".category").text()), searchText);
    };

    /* event */

    $.fn.onExcept = function(eventName, exceptSelector, func) {
        return $(this).on(eventName, e => {
            if (!$(e.target).is(exceptSelector)) {
                func(e);
            }
        });
    };

})(jQuery);