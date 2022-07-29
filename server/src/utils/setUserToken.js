/* eslint-disable no-console */
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

function setUserToken(user, res) {
    const { userId, status } = user
    const token = jwt.sign({ userId, status }, secretKey);
    console.log('in util', token, status)
    res.status(200).json({token, role: status})
}

export { setUserToken };