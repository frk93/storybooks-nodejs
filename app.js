const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
var exphbs  = require('express-handlebars');

require("dotenv").config();


//DB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(res => {
  console.log("MongoDB is connected");
}).catch(err => {
  console.log("Error occured while connecting with DB");
  throw new Error(err);
})

const app = express();
const PORT = process.env.PORT || 4002;

//setting up view
app.engine('.hbs', exphbs({ defaultLayout: "main", extname: ".hbs"}));
app.set('view engine', '.hbs');

//logging
if(process.env.NODE_ENV === "development"){
  app.use(morgan('dev'));
}

app.use("/", require("./routes/index"));

// Listening on server
app.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});

