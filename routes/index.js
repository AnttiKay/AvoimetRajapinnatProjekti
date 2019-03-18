var express = require('express');
var router = express.Router();
var request = require('request');


/* GET home page. */
router.get('/book/:name', function(req, res, next) {
  // var bname, bpic, bgenres, btags ,brating,blanguage, bauthor,bchapters,bdescription;
  request("http://localhost:8081/v1/api/book/"+req.params.name, function (error, response, body) {
    testlogger(error, response, body);

    var data = JSON.parse(body);
    var bookdata = data.response[0];
    // console.log(bookdata);

    request("http://localhost:8081/v1/api/book/"+req.params.name+"/genres", function (error, response, body) {
      testlogger(error, response, body);

      var genredata = JSON.parse(body);
      var bookgenres = genredata.response;

      request("http://localhost:8081/v1/api/book/"+req.params.name+"/tags", function (error, response, body) {
        testlogger(error, response, body);

        var tagdata = JSON.parse(body);
        var booktags = tagdata.response;

        request("http://localhost:8081/v1/api/book/"+req.params.name+"/rating", function (error, response, body) {
          testlogger(error, response, body);

          var ratingdata = JSON.parse(body);
          console.log(bookdata);
          console.log("before render");
          res.render('bookinfo', { title: 'Welkome To BookApi', data: bookdata, genres: bookgenres, tags: booktags, rating: ratingdata.response[0]});

        });


      });

    });
  });
});
router.get('/', function(req, res, next) {
  res.render('index',{title: 'Welkome To BookApi'})
});
function testlogger(error, response, body){
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.)
}
router.get('/book/:bookid', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
