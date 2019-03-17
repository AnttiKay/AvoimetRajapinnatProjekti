var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var bname, bpic, bgenres, btags ,brating,blanguage, bauthor,bchapters,bdescription
  res.render('index', { title: 'Books for everyone', bookname: bname, bookpic:bpic, bookgenres:bgenres, booktags:btags, bookrating:brating, booklanguage:blanguage, bookauthor:bauthor, bookchapters:bchapters,bookdescription:bdescription });
});
router.get('/book/:bookid', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
