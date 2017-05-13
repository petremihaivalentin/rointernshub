var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  require('fs').readFile('public/data/sites.json', 'utf8', function (err, data) {
    if (err) throw err;
    var sites = JSON.parse(data);
    res.render('index', { title: 'Sites', description: 'Common Internal Microsoft Portals', results: sites });
  });
});

module.exports = router;
