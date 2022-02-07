const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Object to route requests
const urlStruct = {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': jsonHandler.success,
    '/badRequest': jsonHandler.badRequest,
    '/unauthorized': jsonHandler.unauthorized,
    '/forbidden': jsonHandler.forbidden,
    '/internal': jsonHandler.internal,
    '/notImplemented': jsonHandler.notImplemented,
    index: jsonHandler.notFound,
};

// onRequest function to handle requests
const onRequest = (request, response) => {
    // parse the url using the url module
    const parsedUrl = url.parse(request.url);
    const params = query.parse(parsedUrl.query);

    // grab the 'accept' headers (comma delimited) and split them into an array
    const acceptedTypes = request.headers.accept.split(',');

    // check if the path name (the /name part of the url) matches
    // any in our url object. If so call that function. If not, default to index.
    if (urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response, params, acceptedTypes);
    } else {
        // otherwise send them to the index (normally this would be the 404 page)
        urlStruct.index(request, response, params, acceptedTypes);
    }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

