// Listening to http requests and response
const http = require('http');
const app = require('./app');

// normalizePort returns a valid port
const normalizePort = (val) => {
    const port = parseInt(val, 10); /*analysis of the argument passed, value obtained assigned to a constant "port"*/

    if (isNaN(port)) { /* if port not a number */
        return val; /* returns the argument passed to the function */
    }
    if (port >= 0) {
        return port; /* if port >=0 = valid so return port */
    }
    return false; /* port<0 = invalid so return false */
};

// Add connection port if not declared
// will listen on port 3000 if no port is provided
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// errorHandler searches various errors and handles them
const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES': // EACCES :  permission denied
            console.error(error);
            process.exit(1);
            break;
        case 'EADDRINUSE': //EADDRINUSE: port already in use
            console.error(error);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// create constant for server calls
const server = http.createServer(app);

// Start the server and display on which port to connect or handles errors
server.on(new Error(), errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening !');
});

// server listens to the port defined 
server.listen(port);