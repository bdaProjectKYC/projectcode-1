var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose
  //   .connect(process.env.MONGODB_CONNECTION_STRING, {
  .connect(
    "mongodb+srv://shka5709:bdaData123@cluster0.1ng1cvf.mongodb.net/bda_data?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));

var indexRouter = require("./routes/index");
var citiesRouter = require("./routes/cities");
var newsRouter = require("./routes/news");
var concertsRouter = require("./routes/concerts");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/cities", citiesRouter);
app.use("/news", newsRouter);
app.use("/concerts", concertsRouter);

// // Return the client
// app.get('/cities*', (_, res) => {
//   res.sendFile(path.join(__dirname, 'public') + '/index.html');
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
