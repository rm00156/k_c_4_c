const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const indexRouter = require('./routes/index');
const upload = require('express-fileupload');
const flash = require('connect-flash');
require('./passport_setup')(passport);
const bodyParser = require('body-parser');
const port = 8000;
const models = require('./models');

const app = express();

app.use(logger('dev'));
app.use(upload());

app.use(bodyParser.json({
    verify: function (req, res, buf) {
        var url = req.originalUrl;
        if (url.startsWith('/stripe')) {
            req.rawBody = buf.toString()
        }
    }
}));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
        secret:'our new secret',
        saveUninitialized:false,
        resave:false,
        store: new MemoryStore({checkPeriod:86400000})
    })
  );

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', indexRouter);

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    // res.render('error');
});


models.sequelize.sync().then((res) =>{
    console.log('Successfully connected to database ' + res.options.database);
}).catch(err =>{
    console.log(err);
})

app.listen(port, () => {
    console.log('Controller Server has started successfully, listening on port ' + port);
});
module.exports = app;