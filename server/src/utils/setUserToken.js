/* eslint-disable no-console */
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

function setUserToken(user, res) {
    const { userId, status } = user
    const token = jwt.sign({ userId, status }, secretKey);
    res.status(200).json({token, status})
}

export { setUserToken };