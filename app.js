const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {UnmeshedClient} = require("@unmeshed/sdk");

// REPLACE these credentials with your own.
// Do not use these credentials in a browser.
// Refer to the browser example and leverage webhooks and user tokens directly.
const unmeshedClient = new UnmeshedClient({
    baseUrl: 'http://localhost',
    port: 8080,
    authToken: 'iBPNno0dOpJ74bBy64l5',
    clientId: '0d368ea2-7ed7-4fc6-8506-d5d5115fce55'
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const processesRouter = require('./routes/processes');
const stepsRouter = require('./routes/steps');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/processes', processesRouter(unmeshedClient));
app.use('/steps', stepsRouter(unmeshedClient));

let workerFunction = (input) => {
    return new Promise((resolve) => {
        const output = {
            ...input || {},
            "ranAt" : new Date()
        }
        resolve(output);
    })
};

const worker = {
    worker: workerFunction,
    namespace: 'default',
    name: 'test-node-worker',
    maxInProgress: 500
};

unmeshedClient.startPolling([worker]);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
