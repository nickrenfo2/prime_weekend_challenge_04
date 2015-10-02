var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

mongoose.connect('mongodb://localhost/todoist');
var List = mongoose.model('List',{title:String,list:Array});

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname,"./public")));

app.get('/', function (req,res) {
    res.sendFile(__dirname+'/public/views/index.html');
});

app.get('/lists', function (req,res,next) {
    return List.find({}).exec(function (err,lists) {
        if (err) throw new Error(err);
        res.send(JSON.stringify(lists));
        next();
    });
});

app.post('/list', function (req,res,next) {
    console.log(req);
    var list = new List({title:req.body.title,list:req.body.list});
    list.save(function (err) {
        if(err) console.log('failed: %s',err);
        res.send(list.toJSON());
    })
});



var server = app.listen(3000, function () {
    console.log('Listening on port:',server.address().port);
});

module.exports = app;