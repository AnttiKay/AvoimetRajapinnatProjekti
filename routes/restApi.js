var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/book/:name', function(req, res, next) { // hakee kirjan tiedot kirjan nimellä
  var sql ="select books.bookName, books.bookDescription, books.bookPicture_url, books.bookChapter_count, language.languageName, authors.authorName\n" +
      "from books\n" +
      "\n" +
      "\t\tjoin language\n" +
      "\t\t\t\ton books.Language_id= language.id\n" +
      "\t\t\t\t\t\t\t\t\n" +
      "\t\tjoin books_authors\n" +
      "\t\t\t\ton books.id = books_authors.Books_id\n" +
      "\t\tjoin authors\n" +
      "\t\t\t\ton books_authors.Authors_id = authors.id\n" +
      "\t\t\t\t\n" +
      "\n" +
      "where books.bookName like ?";
  res.locals.connection.query(sql,req.params.name+"%", function (error, results, fields) {
    if (error) throw error;

    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      //If there is no error, all is good and response is 200OK.
    }
  });
});

router.get('/book/:name/genres', function(req, res, next) { // hakee kirjan genret
  var sql ="select genres.genreName\n" +
      "from genres\n" +
      "\tjoin books_genres\n" +
      "\t\ton genres.id = books_genres.Genres_id\n" +
      "\tjoin books\n" +
      "\t\ton books_genres.Books_id = books.id\n" +
      "where books.bookName like ?";
  res.locals.connection.query(sql,req.params.name+"%", function (error, results, fields) {
    if (error) throw error;

    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      //If there is no error, all is good and response is 200OK.
    }
  });
});
router.get('/book/:name/tags', function(req, res, next) { //hakee kirjan tagit
  var sql ="select tags.tagName, tags.tagDescription\n" +
      "from tags\n" +
      "\tjoin tags_books\n" +
      "\t\ton tags.id = tags_books.Tags_id\n" +
      "\tjoin books\n" +
      "\t\ton tags_books.Books_id = books.id\n" +
      "\n" +
      "where books.bookName like ?";
  res.locals.connection.query(sql,req.params.name+"%", function (error, results, fields) {
    if (error) throw error;

    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      //If there is no error, all is good and response is 200OK.
    }
  });
});
router.get('/book/:name/rating', function(req, res, next) { // hakee kirjan ratinggin
  var sql ="select avg(rating)\n" +
      "from ratings\n" +
      "\tjoin books\n" +
      "\t\ton books.id = ratings.Books_id\n" +
      "where books.bookName like ?";
  res.locals.connection.query(sql,req.params.name+"%", function (error, results, fields) {
    if (error) throw error;

    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      //If there is no error, all is good and response is 200OK.
    }
  });
});


router.get('/genre/:name', function(req, res, next) { // hakee kirjat joissa on haettu genre
  var sql ="select books.bookName, books.bookDescription, books.bookPicture_url, books.bookChapter_count\n" +
      "from books\n" +
      "\t\tjoin books_genres\n" +
      "\t\t\ton books.id = books_genres.Books_id\n" +
      "\t\tjoin genres\n" +
      "\t\t\ton books_genres.Genres_id = genres.id\n" +
      "where genres.genreName like ?";

  res.locals.connection.query(sql,req.params.name+"%", function (error, results, fields) {
    if (error) throw error;

    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      //If there is no error, all is good and response is 200OK.
    }
  });
});

router.get('/genres', function(req, res, next) { // hakee kaikki genret
  var sql ="select genres.genreName\n" +
      "from genres\n" +
      "order by genres.genreName asc";

  res.locals.connection.query(sql, function (error, results, fields) {
    if (error) throw error;

    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      //If there is no error, all is good and response is 200OK.
    }
  });
});

router.get('/tag/:name', function(req, res, next) { // hakee kirjat joissa on haettu tagi
  var sql ="select books.bookName, books.bookDescription, books.bookPicture_url, books.bookChapter_count\n" +
      "from books\n" +
      "\t\tjoin tags_books\n" +
      "\t\t\ton books.id = tags_books.Books_id\n" +
      "\t\tjoin tags\n" +
      "\t\t\ton tags_books.Tags_id = tags.id\n" +
      "where tags.tagName like ?";

  res.locals.connection.query(sql,req.params.name+"%", function (error, results, fields) {
    if (error) throw error;

    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      //If there is no error, all is good and response is 200OK.
    }
  });
});

router.get('/tags', function(req, res, next) { // hakee kaikki tagit ja niiden kuvaukset
  var sql ="select tags.tagName, tags.tagDescription\n" +
      "from tags\n" +
      "order by tags.tagName asc";

  res.locals.connection.query(sql, function (error, results, fields) {
    if (error) throw error;

    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      //If there is no error, all is good and response is 200OK.
    }
  });
});




module.exports = router;
