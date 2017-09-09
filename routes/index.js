var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function (req, res, next) {
    // setup lodash
    var _ = require('lodash');
    _.mixin({
        medianBy: (array, iteratee) => _(array).map(iteratee).sortBy().value()[_.floor(_.size(array) / 2)]
    });

    // render sites, grouped by category and sorted by priority
    var sites = require('./config/sites.json');
    var sitesGroupedByCategory = _(sites)
        .sortBy('priority', 'title')
        .groupBy('category')
        .map((value, key) => ({'category': key, 'sites': value}))
        .sortBy(g => _.medianBy(g.sites, 'priority'), 'category')
        .value();

    res.render('index', { title: 'mssites', description: 'Common Internal Microsoft Portals', sitesGroupedByCategory: sitesGroupedByCategory });
});

module.exports = router;
