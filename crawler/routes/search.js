
var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var co = require('co');
var apiUrl = 'http://www.dyaigou.com/index.php?r=search';
var querystring = require('querystring')
var cheerio = require('cheerio')

router.post('/', function(req, res, next) {
    var keyword = req.body.keyword;
    fetch(apiUrl, {
            method: 'POST',
            body: querystring.stringify({key: 'title', keyword: keyword}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((data) => {
            return data.text()
        }).then((data) => {
            $ = cheerio.load(data)
            var href = $('.t_box a').attr('href');
            href = href.replace('http://www.dyaigou.com/', '') // player_container
            res.send($('.t_box').html())
            // www.dyaigou.com/vipdy/online/201701/15323.html
        })
});

module.exports = router;


