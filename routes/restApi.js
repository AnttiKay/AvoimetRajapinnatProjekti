var express = require('express');
var router = express.Router();
var async = require('async');
/* GET users listing. */
router.get('/book/:name', function(req, res, next) { // hakee kirjan tiedot kirjan nimellä
  var sql ="select books.bookName, books.bookDescription, books.bookPicture_url, books.bookChapter_count, language.languageName, authors.authorName\n" +
      "from books\n" +
      "\n" +
      "\t\tjoin language\n" +
      "\t\t\t\ton books.Language_id= language.id\t\t\t\n" +
      "\t\tjoin books_authors\n" +
      "\t\t\t\ton books.id = books_authors.Books_id\n" +
      "\t\tjoin authors\n" +
      "\t\t\t\ton books_authors.Authors_id = authors.id\n" +
      "\t\t\t\t\n" +
      "\n" +
      "where books.bookName like ?" +
      "order by books.bookName asc";
  res.locals.connection.query(sql,req.params.name+"%", function (error, results, fields) {
    if (error) throw error;

    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      //If there is error, we send the error in the error section with 500 status
    } else {
      // console.log(results);
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
// JSON ON BODY OSASSA

router.post('/addBook', function(req, res, next) {

  function runBulkSelectQuery(sql, array, callback){

    var returnArray = [];

    async.forEachOf(array, function (item, key, callback){
      var next = [item];

      res.locals.connection.query(sql,[next], function (error, results, fields) {
        if(!error){
          returnArray[key] = JSON.parse(JSON.stringify(results));
          callback();
        } else {
          console.log("Error while performing Query");
          callback(error);
        }
      });
    }, function(err){
      if(err){
        //handle the error if the query throws an error
      }else{
        //whatever you wanna do after all the iterations are done
        var temp = [];
        temp[0] = returnArray;
        callback(temp);
      }
    });


    // for (i = 0, len = array.length; i < len; i++) {
    //   var next = [array[i]];
    //   console.log(next);
    //   res.locals.connection.query(sql,[next], function (error, results, fields) {
    //     if (error) throw error;
    //     returnArray[i] = JSON.parse(JSON.stringify(results));
    //     // console.log(returnArray[i]);
    //   });
    // }
  }

  // console.log(req.body.genres);
  var sql = "select `language`.id\n" +
      "from `language`\n" +
      "where `language`.languageName = ?";
  res.locals.connection.query(sql,req.body.languageName, function (error, results, fields) {
    //luo uuden olion books tauluun
    // if (error) throw error;
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": "Book adding failure"}));
      //If there is error, we send the error in the error section with 500 status


    }
    var languageId = JSON.parse(JSON.stringify(results));
    // console.log(languageId);
    // console.log(languageId[0]);
    // console.log(languageId[0].id);
    sql = "Insert into books (bookName,bookDescription,bookPicture_url,bookChapter_count,Language_id)\n" +
        "values ?";
    var bookData= [[req.body.bookName,req.body.bookDescription,req.body.bookPicture_url,req.body.bookChapter_count, languageId[0].id]];

    res.locals.connection.query(sql,[bookData], function (error, results, fields) {
      //hakee genreille idt

      if(error){
          console.log("ERROR Adding book");
        res.send(JSON.stringify({"status": 500, "error": error, "response": "Book adding failure"}));
        //If there is error, we send the error in the error section with 500 status
          return req.exit;
      }

      sql= "select genres.id\n" +
          "from genres\n" +
          "where genres.genreName = ?";
      var genres = [];
      for (var i = 0, len = req.body.genres.length; i < len; i++) {
        genres[i] = [req.body.genres[i].genreName];
      }
      runBulkSelectQuery(sql, genres, function (genreIds) {

        // console.log("genreIds: ");
        // console.log(genreIds);
        sql= "select tags.id\n" +
            "from tags\n" +
            "where tags.tagName = ?";
        var tags = [];
        for (i = 0, len = req.body.tags.length; i < len; i++) {
          tags[i] = [req.body.tags[i].tagName];
        }
        runBulkSelectQuery(sql, tags, function (tagIds) {
          // console.log("tagIDs:");
          // console.log(tagIds);
          sql="select books.id\n" +
              "from books\n" +
              "where books.bookName = ?";
          res.locals.connection.query(sql,req.body.bookName, function (error, results, fields) {
            if (error) throw error;
            if(error){
              res.send(JSON.stringify({"status": 500, "error": error, "response": "Book adding failure"}));
              //If there is error, we send the error in the error section with 500 status
            }
            var bookId = JSON.parse(JSON.stringify(results)); // bookid[0].id
            // var parsedGenresIds = JSON.parse(JSON.stringify(genreIds));
            // var parsedTagsIds = JSON.parse(JSON.stringify(tagIds));
            var tagsInsert = []; // [tagId, bookId]
            var genresInsert = []; // [bookId, genreId]

            for (i = 0, len = genreIds[0].length; i < len; i++) {
              genresInsert[i] = [bookId[0].id, genreIds[0][i][0].id]
            }
            // console.log(genresInsert);
            // console.log(parsedTagsIds);
            for (i = 0, len = tagIds[0].length; i < len; i++) {
              tagsInsert[i] = [tagIds[0][i][0].id, bookId[0].id];
              // console.log(tagIds[0][i][0].id);
            }
            // console.log(tagsInsert);

            sql = "insert into books_genres (Books_id, Genres_id)\n" +
                "values ?"
            res.locals.connection.query(sql,[genresInsert], function (error, results, fields) {
              if (error) throw error;
              if(error){
                res.send(JSON.stringify({"status": 500, "error": error, "response": "Book adding failure"}));
                //If there is error, we send the error in the error section with 500 status
              }
              sql = "insert into tags_books (Tags_id, Books_id)\n" +
                  "values ?"
              res.locals.connection.query(sql,[tagsInsert], function (error, results, fields) {
                if (error) throw error;
                if(error){
                  res.send(JSON.stringify({"status": 500, "error": error, "response": "Book adding failure"}));
                  //If there is error, we send the error in the error section with 500 status
                }
                sql = "select authors.id\n" +
                    "from authors\n" +
                    "where authors.authorName = ?";
                res.locals.connection.query(sql,req.body.authorName, function (error, results, fields) {
                  if (error) throw error;
                  if(error){
                    res.send(JSON.stringify({"status": 500, "error": error, "response": "Book adding failure"}));
                    //If there is error, we send the error in the error section with 500 status
                  }
                  var authorId = JSON.parse(JSON.stringify(results));

                  var authorInsert = [];
                  authorInsert[0] = [bookId[0].id, authorId[0].id];

                  sql = "insert into books_authors(Books_id, Authors_id)\n" +
                      "values ?";
                  res.locals.connection.query(sql,[authorInsert], function (error, results, fields) {
                    if (error) throw error;

                    if(error){
                      res.send(JSON.stringify({"status": 500, "error": error, "response": "Book adding failure"}));
                      //If there is error, we send the error in the error section with 500 status
                    } else {
                      res.send(JSON.stringify({"status": 200, "error": null, "response": "Book adding success"}));
                      //If there is no error, all is good and response is 200OK.
                    }


                  });


                });

              });

            });
          });

        });

      });




    });
  });


});

router.post('/updateBook', function(req, res, next) {

});

router.post('/deleteBook/:name', function(req, res, next) {

    var sql ="select books.id\n" +
        "from books\n" +
        "where books.bookName like ?";

    res.locals.connection.query(sql,req.params.name+"%", function (error, results, fields) {
        var bookId = JSON.parse(JSON.stringify(results));
        if (bookId > 1 || error){
            res.send(JSON.stringify({"status": 500, "error": "Too many results", "response": "Book removing failure"}));
            return req.exit;
        }
        // console.log(bookId[0].id);
        sql = "delete books_authors, books_genres, tags_books\n" +
            "from books_authors\n" +
            "\tjoin books_genres\n" +
            "\t\ton books_genres.Books_id = books_authors.Books_id\n" +
            "\tjoin tags_books\n" +
            "\t\ton tags_books.Books_id = books_authors.Books_id\n" +
            "where books_authors.Books_id = ?";

        res.locals.connection.query(sql,bookId[0].id, function (error, results, fields) {
            if (error){
                res.send(JSON.stringify({"status": 500, "error": error, "response": "Book removing failure"}));
                console.log("Error deleting book tags");
                return req.exit;
            }
            sql = "delete books\n" +
                "from books\n" +
                "where books.id = ?;";
            res.locals.connection.query(sql,bookId[0].id, function (error, results, fields) {
                if (error){
                    res.send(JSON.stringify({"status": 500, "error": error, "response": "Book removing failure"}));
                    console.log("Error deleting book");
                    return req.exit;
                }else{
                  res.send(JSON.stringify({"status": 200, "error": null, "response": "Book removing success"}));
                }
            });
        });

    });
});


module.exports = router;
