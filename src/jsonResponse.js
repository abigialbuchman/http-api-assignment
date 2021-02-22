const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
  console.log('json');
};

const respondXML = (request, response, status, object) => {
  const responseXML = `
        <response>
        <message>${object.message}</message>
        
        `;
  if(object.id){
      responseXML += `<id>${object.id}</id>`;
  }
  respondXML += `</response>`;
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(responseXML);
  console.log('xml');
};

const success = (request, response, type) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  if (type === 'text/xml') {
    return respondXML(request, response, 200, responseJSON);
  }
  
    return respondJSON(request, response, 200, responseJSON);
  
  
};

const badRequest = (request, response, type, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (type === 'text/xml') {
    if (!params.valid || params.valid !== 'true') {
      responseJSON.message = 'Missing valid query paramenter set to true';
      responseJSON.id = 'badRequest';
      return respondXML(request, response, 400, responseJSON);
    }
    else{
    return respondXML(request, response, 200, responseJSON);
    }
  }
  
    if (!params.valid || params.valid !== 'true') {
        responseJSON.message = 'Missing valid query paramenter set to true';
        responseJSON.id = 'badRequest';
        return respondJSON(request, response, 400, responseJSON);
      }
    
      return respondJSON(request, response, 200, responseJSON);
  
  
};

const notFound = (request, response, type) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (type === 'text/xml') {
    return respondXML(request, response, 404, responseJSON);
  }
  
  return respondJSON(request, response, 404, responseJSON);
  
};

const unauthorized = (request, response, type, params) => {
  const responseJSON = {
    message: 'Contains loggedin query paramenter set to yes',
    id: 'unauthorized',
  };

  if (type === 'text/xml') {
    if (!params.loggedIn || params.loggedIn !== 'yes') {
      responseJSON.message = 'Missing loggedin query paramenter set to yes';
      return respondXML(request, response, 401, responseJSON);
    }
    return respondXML(request, response, 200, responseJSON);
  }

    if (!params.loggedIn || params.loggedIn !== 'yes') {
        responseJSON.message = 'Missing loggedin query paramenter set to yes';
        return respondJSON(request, response, 401, responseJSON);
      }
      return respondJSON(request, response, 200, responseJSON);
  
};

const forbidden = (request, response, type) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  if (type === 'text/xml') {
    return respondXML(request, response, 403, responseJSON);
  }
    return respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response, type) => {
  const responseJSON = {
    message: 'Internal Server Error',
    id: 'internalError',
  };
  if (type === 'text/xml') {
    return respondXML(request, response, 500, responseJSON);
  }
    return respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response, type) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notFound',
  };
  if (type === 'text/xml') {
    return respondXML(request, response, 501, responseJSON);
  }
  
  return respondJSON(request, response, 501, responseJSON);
  
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
};
