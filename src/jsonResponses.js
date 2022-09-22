// This object  will be reset each time the server restarts!
const users = {};

const respond = (request, response, status, responseJSON) => {
  response.writeHead(status, {
    'Content-Type': 'application/json',
  });
  if (responseJSON) response.write(JSON.stringify(responseJSON));
  response.end();
};

const addUser = (request, response, query) => {
  let statusCode;
  let responseJSON;

  const { name, age } = query;
  if (typeof name === 'undefined' || typeof age === 'undefined' || name === '' || age === '' || Number.isNaN(age)) {
    statusCode = 400;
    responseJSON = {
      message: 'Name and age are both required.',
      id: 'addUserMissingParams',
    };
  } else {
    if (users[name] !== undefined) {
      statusCode = 204;
    } else {
      statusCode = 201;
      responseJSON = {
        message: 'Created Successfully.',
      };
    }
    users[name] = { name, age };
  }

  return respond(request, response, statusCode, responseJSON);
};

const getUsers = (request, response) => {
  let responseJSON;
  if (request.method !== 'HEAD') {
    responseJSON = { users };
  }

  return respond(request, response, 200, responseJSON);
};

const notFound = (request, response) => {
  let responseJSON;
  if (request.method !== 'HEAD') {
    responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };
  }

  return respond(request, response, 404, responseJSON);
};

module.exports = {
  addUser,
  getUsers,
  notFound,
};
