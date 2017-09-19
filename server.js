/**
 * load dependencies
 */

const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const expressLayouts = require('express-ejs-layouts');


// tell express where to look for static assets
app.use(express.static(`${__dirname}/public`));

// set ejs as templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);


app.get('/', (req, res) => {
  res.render('pages/home');
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
