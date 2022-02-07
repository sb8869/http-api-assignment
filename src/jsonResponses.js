const respondJSON = (request, response, status, object, type) => {
    const headers = {
        'Content-Type': type,
    }

    response.writeHead(status, headers);
    response.write(object);
    response.end();
};

const success = (request, response, acceptedTypes) => {
    const responseJSON = {
        message: 'This is a successful response',
      };
    
    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML += '<message>This is a successful response</message></response>';

        respondJSON(request, response, 200, responseXML, 'text/xml');
    }

    respondJSON(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

const badRequest = (request, response, params, acceptedTypes) => {
    const responseJSON = {
        message: 'This request has the required parameters.',
      };

    if(!params.valid || params.valid !== 'true') {
        responseJSON.message = 'Missing valid query parameter set to true';
        responseJSON.id = 'badRequest';

        if (acceptedTypes[0] === 'text/xml') {
            let responseXML = '<response>';
            responseXML += '<message>Missing valid query parameter set to true</message><id>badRequest</id></response>';
    
            respondJSON(request, response, 200, responseXML, 'text/xml');
        }
    }
    
    return respondJSON(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

const unauthorized = (request, response, params, acceptedTypes) => {
    const responseJSON = {
        message: 'This request has the required parameters.',
      };

    if(!params.loggedIn || params.loggedIn !== 'yes') {
        responseJSON.message = 'Missing valid query parameter set to yes';
        responseJSON.id = 'Unauthorized'
        
        if (acceptedTypes[0] === 'text/xml') {
            let responseXML = '<response>';
            responseXML += '<message>Missing valid query parameter set to yes</message><id>unauthorized</id></response>';
    
            respondJSON(request, response, 200, responseXML, 'text/xml');
        }
    }

    return respondJSON(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
    const responseJSON = {
        message: 'You do not have permission to access this page on the server.',
      };
    
    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML += '<message>You do not have permission to access this page on the server</message><id>forbidden</id></response>';

        respondJSON(request, response, 200, responseXML, 'text/xml');
    }
    
    return respondJSON(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

const internal = (request, response, acceptedTypes) => {
    const responseJSON = {
        message: 'Oops, something went wrong. The Server encountered an internal error.',
      };
    
    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML += '<message>Oops, something went wrong. The Server encountered an internal error.</message><id>internal</id></response>';

        respondJSON(request, response, 200, responseXML, 'text/xml');
    }
    
    return respondJSON(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
    const responseJSON = {
        message: 'The server either does not recognize the request method, or it lacks the ability to fulfil the request.',
      };
    
    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML += '<message>The server either does not recognize the request method, or it lacks the ability to fulfil the request.</message><id>notImplemented</id></response>';

        respondJSON(request, response, 200, responseXML, 'text/xml');
    }

    return respondJSON(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
    const responseJSON = {
        message: 'The requested URL was not found on this server.',
      };
    
    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML += '<message>The requested URL was not found on this server.</message><id>notFound</id></response>';

        respondJSON(request, response, 200, responseXML, 'text/xml');
    }
    
    return respondJSON(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound,
}