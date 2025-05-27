var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'mysql'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
// si en dado caso no se ejecuta este código utilizar desde la consola de mysql:
// use mysql;  
// CREATE TABLE IF NOT EXISTS desarrolloWeb;
let queryCreateDB = 'CREATE DATABASE IF NOT EXISTS mysql;';
let queryCreateTableGoals='CREATE TABLE IF NOT EXISTS `goals` (  \
  `id` int(11) NOT NULL auto_increment, \    \
  `name` varchar(250)  NOT NULL default \'\', \
  `description` varchar(250)  NOT NULL default \'\', \
  `dueDate` varchar(250)  NOT NULL default \'\', \
   PRIMARY KEY  (`id`) \
  );'

connection.query(queryCreateDB, function (err, results, fields){
  if(err){
    console.log(err);
  }else{
    console.log(results);
    console.log(fields);
  }
});

connection.query(queryCreateTableGoals, function (err, results, fields){
  if(err){
    console.log(err);
  }else{
    console.log(results);
    console.log(fields);
  }
});
connection.destroy()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var goalsRouter = require('./routes/goals');
const router = express.Router()

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if(req.headers.authorization && req.headers.authorization === "123") {
    next();
  }else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/goals', goalsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;