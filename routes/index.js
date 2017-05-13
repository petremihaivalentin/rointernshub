var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  require('fs').readFile('public/data/sites.json', 'utf8', function (err, data) {
    if (err) throw err;
    var sites = JSON.parse(data);
    var _ = require('lodash');
    _.mixin({
      medianBy: function(array, iteratee) {
        return _(array).map(iteratee).sortBy().value()[_.floor(_.size(array) / 2)]
      }
    });
    var groupedSites = _(sites).sortBy('priority', 'title')
                                .groupBy('category')
                                .map(function(value, key) { return {'category': key, 'sites': value}})
                                .sortBy(function(g) { return _.medianBy(g.sites, 'priority') }, 'category')
                                .value();
    res.render('index', { title: 'Sites', description: 'Common Internal Microsoft Portals', results: groupedSites });
  });
});

module.exports = router;
