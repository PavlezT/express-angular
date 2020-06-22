var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bb = require('express-busboy');
var session = require('express-session')
const expressOasGenerator = require('express-oas-generator');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger-oas.json');
let config = require('./config');

const { checkAuth } = require('./helpers/auth');
const crmConnect = require('./helpers/crm');

var authRouter = require('./routes/auth');
var territoryRouter = require('./routes/territory');
var activityStatusRouter = require('./routes/activity-status');
var clinicRouter = require('./routes/clinic');
var userRouter = require('./routes/user');
var settingsRouter = require('./routes/settings');
var languagesRouter = require('./routes/language');
var languagesMobileRouter = require('./routes/language-mobile');
var questionsRouter = require('./routes/questions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: config.SESSION.secret,
  name: 'AposCTS_Admin_pannel',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: config.SESSION.secure,
    maxAge: config.SESSION.expiry // = 1000 * 60 * 60 * 24 * 14 = 2 weeks
  }
}))
app.use(express.static(path.join(__dirname, 'public')));
bb.extend(app, { upload: true})

if (config.name === 'development') {
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  if ( config.swagger === 'edit')
    expressOasGenerator.init(app, swaggerDoc, './swagger-oas.json');
  else 
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  
  console.log('Swagger is started on:', config.SERVER.base_url + ':'+ config.SERVER.port + '/api-docs')
}

setTimeout(() => { // because of stupid Swagger (expressOasGenerator)

  app.use(config.SERVER.prefix + '/auth', authRouter);
  app.use(config.SERVER.prefix + '/territories', checkAuth, territoryRouter);
  app.use(config.SERVER.prefix + '/activity-status', checkAuth, activityStatusRouter);
  app.use(config.SERVER.prefix + '/clinic', checkAuth, clinicRouter);
  app.use(config.SERVER.prefix + '/user', checkAuth, userRouter);
  app.use(config.SERVER.prefix + '/settings', checkAuth, settingsRouter);
  app.use(config.SERVER.prefix + '/languages', checkAuth, languagesRouter);
  app.use(config.SERVER.prefix + '/mobile/languages', checkAuth, languagesMobileRouter);
  app.use(config.SERVER.prefix + '/questions', checkAuth, questionsRouter);
  
  // working only for Capped collections (when patients is not capped)
  // crmConnect(); // connect watcher to upload new patients to CRM

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
}, 1200);

module.exports = app;
