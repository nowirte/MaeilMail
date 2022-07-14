import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

function setUserToken(user, res) {
  try {
    const { userId, status } = user
    const token = jwt.sign({ userId, status }, secretKey);
    if ( status == "google") {
      res.redirect(`/googleSignup?token=${token}`);
    }
  } catch (err) {
    console.log(err);
  }
}

export { setUserToken };