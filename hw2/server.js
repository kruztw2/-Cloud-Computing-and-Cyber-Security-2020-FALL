var express = require('express');
var request = require('request');
var bodyParser = require('body-parser')
var app = express();
var jsonParser = bodyParser.json()

app.use(express.json());
app.use(express.urlencoded());

app.get('/', function(req, res) {
    res.render('./index.ejs', {show: false});
});



//POST 動作
app.post('/advertise', jsonParser,  function(req, res) {

	let sex = req.body.sex;
    request.post(
        'https://6c4lwp3ccj.execute-api.ap-northeast-2.amazonaws.com/default/get_advertise',
        { json: { sex: sex, bucket: 'kruztwb1' } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {

            	var adv_list = body.split('\n');
            	console.log(adv_list, adv_list.length, adv_list[0], adv_list[1], adv_list[2]);

            	res.render('./index.ejs', {show: true, data: adv_list});
                console.log(body);
            }
        }
    );
}); 


app.get('*', function(req, res) {
    res.send('404 not found');
});
var server = app.listen(3000, function() {
    console.log('Listening on port 3000');
});
