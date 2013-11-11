
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , summarizer = require('./routes/summarizer')
  , signup = require('./routes/signup')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use('/', express.static(path.join(__dirname, '../public')));
app.get('/summary', summarizer.summarize);
app.get('/email', signup.withEmail)

if ('production' == app.get('env')){
  http.createServer(app).listen(80, "162.209.88.214" ,function(){
    console.log('Express server listening at 162.209.88.214 on port 80 not' + app.get('port'));
  });
}
else{
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
}
