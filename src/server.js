const http = require('http');
const url = require('url');
const query = require('querystring');
// const htmlResponse = require('./htmlResponse.js');
const htmlHandler = require('./htmlResponse.js');
const jsonHandler = require('./jsonResponse');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
  '': htmlHandler.getIndex,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/notImplemented': jsonHandler.notImplemented,
  '/internal': jsonHandler.internal,
  notFound: jsonHandler.notFound,
};

const onRequest = (request, response) => {
  const parseURL = url.parse(request.url);
  // const contentType = request.headers.acceptedType;

  const acceptedType = request.headers.accept.split(',');
  //console.log(acceptedType);
  const params = query.parse(parseURL.query);

  if (urlStruct[parseURL.pathname]) {
    urlStruct[parseURL.pathname](request, response, acceptedType, params);
    console.log(urlStruct[parseURL.pathname]);
  } else {
    urlStruct.notFound(request, response, acceptedType, params);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
