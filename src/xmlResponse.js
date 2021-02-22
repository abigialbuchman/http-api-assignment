const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const successXML = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respondJSON(request, response, 200, responseJSON);
};

const badRequestXML = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };
};

const notFoundXML = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
};

const unauthorizedXML = (request, response) => {
  const responseJSON = {
    message: 'Missing loggedin query paramenter set to yes',
    id: 'unauthorized',
  };
};

const forbiddenXML = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };
};

const internalXML = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error',
    id: 'internalError',
  };
};

const notImplementedXML = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notFound',
  };
};

module.exports = {
  successXML,
  badRequestXML,
  notFoundXML,
  unauthorizedXML,
  forbiddenXML,
  internalXML,
  notImplementedXML,
};
