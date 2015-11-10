var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var config = require('./config.json');
var cheerio = require('cheerio');
var download = require('./download');
var url = require('url');

// routes will go here
app.get("/", function(req, res, next) {
    res.send("<p>Use get url like this <a href='/api?target=amazon&keyword=smartphone'>/api?target=amazon&keyword=smartphone</a> and your keyword</p>");
});
app.get('/api', function(req, res) {
    var config_properties = config[req.param('target')];
    var search_url = config_properties.url + req.param('keyword');
    var page_1 = [''];
    download(search_url, page_1).on('finish', function(){
        var first_link = getItemLink(page_1[0], config_properties.firstItem);
        var page_2 = [''];
        download(first_link, page_2).on('finish', function(){
            var props = getItemProperties(page_2[0], config_properties);
            res.send(props);
            //res.send(page_1[0]);
        });
    });
});

// start the server

app.listen(port);
console.log('Server started! At http://localhost:' + port);

// ***********************************************
// Utilities
// ***********************************************
function getItemLink (data, query){
    var res = '';
    if (data) {
        var $ = cheerio.load(data);
        res = $(query).first().attr("href");
    }
    return res;
}

function getItemProperties (data, queries){
    var res = {price:0, title:'', imageUrl: '', details: []};
    if (data) {
        var $ = cheerio.load(data);
        res.price = $(queries.price).first().text();
        res.imageUrl = $(queries.image).first().attr('src');
        res.title = $(queries.title).first().text(); //productTitle
        $(queries.details).each(function(i, e) {
            res.details.push($(e).text());
        });
    }
    return res;
}
