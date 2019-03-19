# AvoimetRajapinnatProjekti
Avoimet rajapinnat kurssin projekti

Rest rajapinnan kyselymuodot:

POST /v1/api/addbook

Lisää kirjan json datan mukaan

JSON: 

{"bookName":"osmoooooooo","bookDescription":"seiddkkailee","bookPicture_url":null,"bookChapter_count":332,"languageName":"English","authorName":"ismo","genres":[{"genreName":"Drama"},{"genreName":"Fantasy"}],
 "tags":[ {"tagName":"Horror"},{"tagName":"Adventure"},{"tagName":"Fantasy"},{"tagName":"Drama"}]}
 
POST /v1/api/deleteBook/:name

Poistaa kirjan nimellä


GET /v1/api/tags

Palauttaa kaikki tagit


GET /v1/api/tag/:name

Palauttaa kirjat jossa on tagi, jonka nimi :name muuttujan tilalle


GET /v1/api/genres

Palauttaa kaikki genret


GET /v1/api/genre/:name

Palauttaa kaikki kirjat jossa on nimetty genre


GET /v1/api/book/:name/rating

Palauttaa nimetyn kirjan ratinggin


GET /v1/api/book/:name/tags

Palauttaa nimetyn kirjan tagit


GET /v1/api/book/:name/genres

Palauttaa nimetyn kirjan genret


GET /v1/api/book/:name

Palauttaa kaikki kirjat, jotka alkavat :name muuttujan sisällöllä