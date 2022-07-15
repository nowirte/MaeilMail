/* eslint-disable no-console */
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

function setUserToken(user, res) {
  try {
    const { userId, status } = user
    const token = jwt.sign({ userId, status }, secretKey);
    if ( status === "google") {
      res.redirect(`/googleSignup?token=${token}`);
      return
    }
    // 프론트 메인화면 url로 redirect
    res.redirect(`/?token=${token}`)
  } catch (err) {
    console.log(err);
  }
}

export { setUserToken };