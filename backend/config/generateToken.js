const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, 'B5lgSeR7prDwxAJ1', {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
