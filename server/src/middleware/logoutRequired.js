function logoutRequired(req, res, next) {
  const userToken = req.headers['authorization']?.split(' ')[1];

  if (userToken) {
    console.log('로그인한 유저의 로그인 접근');
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '로그아웃 하시기 바랍니다.',
    });
    return;
  }
  next();
}

export { logoutRequired };
