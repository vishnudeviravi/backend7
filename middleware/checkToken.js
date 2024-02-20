import jwt from 'jsonwebtoken';

const checkToken = role => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(403).json({ message: 'You are not authorized' });
      }
      const ogToken = token.split(' ')[1];
      const secretKey = process.env.SECRET_KEY;
      const isValid = jwt.verify(ogToken, secretKey);
      if (!role.includes(isValid.role)) {
        return res.status(403).json({ message: 'You are not authorized' });
      }
      next();
    } catch (e) {
      return res.status(403).json({ message: 'You are not authorized' });
    }
  };
};

export default checkToken;
