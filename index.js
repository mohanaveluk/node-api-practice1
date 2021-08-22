const http = require('http');
const express = require('express');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
const flash = require('express-flash');
const session = require('express-session');
const csrf = require('csurf');
const cors = require('cors');
var elogger = require('./logger/logconfig');

const routerProduct = require('./routes/product');

const app = express();

const IN_PRODUCITION = process.env.NODE_ENV === 'production';
const SESSION_LIFE=1000*60*60*2;

const expressSwagger = require('express-swagger-generator')(app);

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
const csrfProtection = csrf();

app.use(cors({'origin': '*'}));

//implement swagger options
let options = {

    swaggerDefinition: {
        info: {
            description: 'This is for learning Nodejs',
            title: 'Learning',
            version: '1.0.0',
            contact: {
                name: 'Mohanavelu Kumarsamy'
            }
        },
        //host: IN_PRODUCITION ? 'localhost:3000' : 'localhost:3000',
        host: IN_PRODUCITION ? 'stardentalsyncher-hqhsvwro4a-uc.a.run.app' : 'localhost:3000',
        basePath: '/',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/*.js'] //Path to the API handle folder
};

expressSwagger(options);


app.get('/', (req, res) => res.send("This is my root end point"));

app.use('/api/v1/product', routerProduct);


//CSRF Protection
app.use(csrfProtection);
app.use(function (err, req, res, next) {
    //console.log(req.originalUrl, ' - ', req.csrfToken());
    //res.locals.csrfToken = req.csrfToken();
    next();
});

//allow OPTIONS on all resources
app.options('*', cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404, 'Endpoint is not defined'));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.locals.user = req.user || null;
    res.locals.session = req.session;

    const status = err.status || err.statusCode || 500;
    const message = err.message;
    const data = err.data ? err.data : err;
    elogger.error(`message: '${err}'`);
    elogger.error(JSON.stringify(err));
    elogger.error(req.originalUrl);

    // render the error page
    if (req.originalUrl.indexOf('/api') >= 0) {
        res.status(status).json({ message: message, data: data });
        return next();
    }
    //res.render('error', {message: req.flash(err)});
    next();
});


//Crerate and initialise http server
var server = http.createServer(app);
app.listen(port, ()=> console.log('Creating express node application'));

server.on('error', onError);
server.on('listening', onListening);

/*
const http = require("http");

const host = 'localhost';
const port = 3500;


const server = http.createServer(function(req, res) {
    
});

server.listen(port, () => {
    console.log("Creating node app");
}); 

*/

/**
* Event listener for HTTP server "listening" event.
*/

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    //cronjob.startCronJob();
}

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}