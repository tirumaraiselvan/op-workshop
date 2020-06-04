const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Request Handler
app.post('/send-email', async (req, res) => {

  // success
  return res.json({
    id: 1
  })

});

app.listen(PORT, function () {
  console.log('Your app is listening on port ' + PORT);
});


