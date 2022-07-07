const jwt = require('jsonwebtoken')

const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

export { secretKey };

export function setUserToken(res, user) {
  const token = jwt.sign({ }, secretKey);
  res.cookie('token', token);
}
