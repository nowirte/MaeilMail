import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

function setUserToken(user, res) {
  try {
    const token = jwt.sign({ id: user.userId, status: user.status }, secretKey);
    res.status(200).json(token);
  } catch (err) {
    console.log(err);
  }
}

export { setUserToken };
