// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date_string?", (req, res)=>{
  let date_string = req.params.date_string;

  let now = new Date();

  if(!date_string) {
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    })
  }

  //regex
let pettern1 = /^\d{4}-\d{2}-\d{2}$/; //15-12-25
let pettern2 = /^\d+$/; //1451001600000
let pettern3 = /^\d{2}\s(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}?/;

//inisiasi unix dan utc
let unix;
let utc;

//jika cocok dengan regex pettern1 atau pettern3
if(date_string.match(pettern1) || date_string.match(pettern3)){
  let date = new Date(date_string),

  unix = date.getTime();

  utc = date.toUTCString();

  return res.json({
    unix : Number(unix),
    utc : utc,
  })
}

if(date_string.match(pettern2)){
  let date2 = new Date(Number(date_string)),

  unix = Number(date_string);

  let utc = date2.toUTCString();

  return res.json({
    unix : unix,
    utc : utc,
  })
}

return res.json({
  'error': 'Invalid Date',
})

})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
