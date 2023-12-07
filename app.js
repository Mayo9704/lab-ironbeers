const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
// app.engine('views', exphbs({extname: 'views'}));
// app.engine(".hbs", exphbs.engine);
// ...
app.set("view engine", "hbs") //Engine HBS
app.set("views", __dirname +"/views") //Folder views (templates)


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// Iteration 3 - Beers Page
// app.get('/beers', (req, res) => {
//   res.render('beers');
// });

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => {
      console.log(error);
      res.render('error');
    });
});

// Iteration 4 - Random Beer Page
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeerFromAPI => {
      
      const randomBeer = randomBeerFromAPI[0]; 
      res.render('random-beer', { beer: randomBeer });
    })
    .catch(error => console.log(error));
});

//.. 

punkAPI
  .getBeers()
  .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
  .catch(error => console.log(error));

app.listen(3003, () => console.log('🏃‍ on port 3003'));
